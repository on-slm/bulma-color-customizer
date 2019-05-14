const express = require('express');
const async = require('async');
const crypto = require('crypto');

const User = require('../../models/user');

User.createUser = function (userData) {
  const user = new User(userData);
  return user.save();
};

User.patchUser = function (id, userData) {
  return new Promise((resolve, reject) => {
    User.findById(id, function (err, user) {
      if (err) reject(err);
      for (let i in userData) {
        user[i] = userData[i];
      }
      user.save(function (err, updatedUser) {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};

User.list = function (perPage, page) {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, usersList) {
        if (err) {
          reject(err);
        } else {
          resolve(usersList);
        }
      });
  });
};

exports.insert = function (req, res, next) {
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt).update(req.body.pass).digest("base64"); // .update(req.body.pass)
  req.body.pass = salt + "$" + hash;
  User.createUser(req.body).then((result) => {
    res.status(201).send({
      id: result._id
    });
  });
};

exports.getById = function (req, res, next) {
  User.findById(req.params.id, '-__v').then(function (results) {
    res.status(200).send(results);
  });
};

exports.patchById = function (req, res, next) {
  if (req.body.pass) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.pass).digest("base64");
    req.body.pass = salt + "$" + hash;
  }
  User.patchUser(req.params.id, req.body).then((result) => {
    res.status(204).send({});
  });
};

exports.removeById = function (req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, deletedUser) {
    if (err) throw err;
    res.status(204).send(deletedUser);
  });
};

exports.listUsers = function (req, res, next) {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  User.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};
