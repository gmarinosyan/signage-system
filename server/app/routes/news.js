// app/routes/media.js
var NewsModel = require('../models/newsModel');
var ConfigModel = require('../models/configModel');
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
        console.log(news.name);

        news.save(function(err) {
            if (err){
              res.send(err);
            } else {
              NewsModel.count({}, function(err, count){
                var update = {
                  newsCount:count,
                  lastUpdatedNews: Date.now(),
                  lastUpdated: Date.now()
                };
                ConfigModel.findOneAndUpdate({}, update, {}, function(err, doc){
                  if(err){
                    res.send(err);
                  } else if (!doc){
                    res.send("Config object doesn't exist. Please reset config.");
                  } else {
                    res.send("News added succesfully. Config updated.");
                  }
                });
              });
            }
        });
  });
};
