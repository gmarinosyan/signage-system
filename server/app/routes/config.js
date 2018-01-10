// app/routes/media.js
var ConfigModel = require('../models/configModel');
var NewsModel = require('../models/newsModel');
var MediaModel = require('../models/mediaModel');

module.exports = function(router) {
  'use strict';
  // This will handle the url calls for /users/:user_id
  /*router.route('/:userId')
  .get(function(req, res, next) {
    // Return user
  }) 
  .put(function(req, res, next) {
    // Update user
  })
  .patch(function(req, res,next) {
    // Patch
  })
  .delete(function(req, res, next) {
    // Delete record
  }); */

  router.route('/')
  .get(function(req, res, next) {
    ConfigModel.findOne(function(err, config) {
            if (err)
                res.send(err);

            res.json(config);
        });
  })

  .put(function(req, res, next) {
    var update = {
      colourScheme:req.body.colourScheme
    }
    ConfigModel.findOneAndUpdate({}, update, {}, function(err, doc){
      if(err){
        res.send(err);
      } else if(!doc){
        res.send("No config to update. Please create one using a post request.");
      }
      else {
        res.send("Updated config succesfully!");
      }
    });
  })

  .post(function(req, res, next) {
    ConfigModel.remove({}, function(){
      NewsModel.count({}, function(err, newsCount){
        MediaModel.count({}, function(err, mediaCount){
          var config = new ConfigModel();
          config.lastUpdated = Date.now();
          config.lastUpdatedMedia = Date.now();
          config.lastUpdatedNews = Date.now();
          config.colourScheme = "light";
          if(req.body.colourScheme && req.body.colourScheme != ""){
            config.colourScheme = req.body.colourScheme;
          }
          config.mediaCount = mediaCount;
          config.newsCount = newsCount;
          config.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Config created (and reset)!' });
          });
        });
      });
    });
  });

};
