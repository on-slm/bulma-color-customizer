const express = require('express');
const async = require('async');

// primary model = labels of Sasses
const SassLabel = require('../models/sasslabel');

// ?? secondary model = sasses themselves
const Sass = require('../models/sass')


// display list of all sass labels 
exports.list_sass_labels = function(req, res, next) {
    res.send('NOT IMPLEMENTED: list of all sass labels');
  };

// Display detail page for a specific Label.
// tady pokus udelat to samostatne - PAK DODELAT
exports.sass_label_detail = function(req, res, next) {

    async.parallel({
        label: function(callback) {
            SassLabel.findById(req.params.id)
              .exec(callback)
        },
        labels_sasses: function(callback) {
          Sass.find({ 'label': req.params.id },'code')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.label==null) { // No results.
            var err = new Error('Label not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', label: results.label, labels_sasses: results.labels_sasses } );
    });
};

  
  // display Sass label create form on GET
  exports.sass_label_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: display create form')
  }
  
  // handle Sass label create form on POST
  exports.sass_label_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: handle create form')
  }
  
  // display Sass label delete form on GET
  exports.sass_label_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: display delete form')
  }
  
  // handle Sass label delete form on POST
  exports.sass_label_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: handle delete form')
  }
  
  // display Sass label update form on GET
  exports.sass_label_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: display update form')
  }
  
  // handle Sass label update form on POST
  exports.sass_label_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: handle update form')
  }
  
  