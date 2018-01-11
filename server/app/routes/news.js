// app/routes/media.js
var NewsModel = require('../models/newsModel');
var ConfigModel = require('../models/configModel');
var async = require('async');

module.exports = function(router) {
  'use strict';

  router.route('/')
  .get(function(req, res, next) {
    NewsModel.find(function(err, news) {
            if (err)
                res.send(err);

            res.json(news);
        });
  })
  .post(function(req, res, next) {
    var news = new NewsModel();
    news.name = req.body.name;
    news.content = req.body.content;
    news.duration = req.body.duration;
    news.order = req.body.order;

    async.waterfall([
      function(callback){
        news.save(function(err) {
          if (err){
            callback(err);
          } else {
            callback(null)
          }
        });
      },
      function(callback){
        NewsModel.count({}, function(err, count){
          if(err){
            callback(err);
          } else {
            callback(null, count);
          }
        });
      },
      function(count, callback){
        var update = {
          newsCount:count,
          lastUpdatedNews: Date.now(),
          lastUpdated: Date.now()
        };
        ConfigModel.findOneAndUpdate({}, update, {}, function(err, doc){
          if(err){
            callback(err);
          } else if (!doc){
            callback("Config object doesn't exist. Please reset config.");
          } else {
            callback(null);
          }
        });
      }
    ], 
    function(err){
      if(err){
        res.send(err);
      } else {
        res.send("News sucessfully added.");
      }
    });
  });
};
