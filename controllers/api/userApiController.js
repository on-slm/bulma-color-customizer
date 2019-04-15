const express = require('express');
const async = require('async');
const crypto = require('crypto');

const User = require('../../models/user');

User.createUser = function (userData) {
  const user = new User(userData);
  return user.save();
};

exports.insert = function (req, res, next) {
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt)
    .update(req.body.pass) // .update(req.body.pass)
    .digest("base64");
  req.body.pass = salt + "$" + hash;
  req.body.permissionLevel = 1;
  User.createUser(req.body)
    .then((result) => {
      res.status(201).send({
        id: result._id
      });
    });
};
