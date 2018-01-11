// app/routes/media.js
var ConfigModel = require('../models/configModel');
var NewsModel = require('../models/newsModel');
var MediaModel = require('../models/mediaModel');
var async = require('async');

module.exports = function(router) {
  'use strict';

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
      colourScheme:req.body.colourScheme,
      lastUpdated: Date.now()
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
    async.waterfall([
      function(callback){
        ConfigModel.remove({}, function(err){
          if(err){
            callback(err);
          } else {
            callback(null);
          }
        });
      },
      function(callback){
        NewsModel.count({}, function(err, newsCount){
          if(err){
            callback(err);
          } else {
            callback(null, newsCount);
          }
        });
      },
      function(newsCount, callback){
        MediaModel.count({}, function(err, mediaCount){
          if(err){
            callback(err);
          } else {
            callback(null, newsCount, mediaCount);
          }
        });
      },
      function(newsCount, mediaCount, callback){
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
          if (err){
            callback(err);
          } else {
            callback(null);
          }
        });
      }],
      function(err){
        if(err){
          res.send(err);
        } else {
          res.json({ message: 'Config created (and reset)!'});
        }
      }
    );
  });

};
