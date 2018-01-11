// app/routes/media.js
var MediaModel = require('../models/mediaModel');
var ConfigModel = require('../models/configModel');
var AWS = require('aws-sdk');
var async = require('async');

module.exports = function(router) {
  'use strict';
  var s3 = new AWS.S3();

  router.route('/')
  .get(function(req, res, next) {
    MediaModel.find(function(err, media) {
            if (err)
                res.send(err);

            res.json(media);
        });
  })
  .post(function(req, res, next) {
    async.waterfall([
      function(callback){
        ConfigModel.findOne({}, function(configErr, configObject){
          if(configErr){
            callback(configErr);
          } else {
            callback(null, configObject);
          }
        });
      },
      function(configObject, callback){
        var media = new MediaModel();
        media.name = req.body.name;
        media.filename = req.body.filename;
        media.filetype = req.body.filetype;
        media.type = req.body.type;
        media.duration = req.body.duration;
        media.order = configObject.mediaCount+1;
        console.log(media.name);

        media.save(function(err) {
          if(err){
            callback(err);
          } else {
            callback(null, media);
          }
        });
      },
      function(media, callback){
        MediaModel.count({}, function(err, count){
          if(err){
            callback(err);
          } else {
            callback(null, media, count);
          }
        });
      },
      function(media, count, callback){
        var update = {
          mediaCount: count,
          lastUpdatedMedia: Date.now(),
          lastUpdated: Date.now()
        };
        ConfigModel.findOneAndUpdate({}, update, {}, function(err, doc){
          if(err){
            callback(err);
          } else if (!doc){
            callback("Config object doesn't exist. Please reset config.");
          } else {
            callback(null, media);
          }
        });
      },
      function(media, callback){
        var params = {
          Bucket: "starschoolsignage",
          Key: media.filename,
          Expires: 600,
          ContentType: media.filetype
        };

        s3.getSignedUrl('putObject', params, function(err, data) {
          if(err){
            callback(err);
          } else {
            callback(null, data);
          }
        });
      }], 
      function(err, data){
        if(err){
          res.send(err);
        } else {
          res.json({ message: 'File created!', url: data});
        }
      }
    );
  })
  .put(function(req, res, next) {
    var update = {};
    if(req.body.name && req.body.name != ""){
      update.name = req.body.name;
    }
    if(req.body.duration){
      update.duration = req.body.duration;
    }
    if(req.body.order){
      update.order = req.body.order;
    }
    MediaModel.findByIdAndUpdate(req.body.id, update, {}, function(err, doc){
      if(err){
        res.send(err);
      } else if (!doc){
        res.send("Media to update not found. ID: " + req.body.id);
      } else {
        res.send("Media updated succesfully.");
      }
    });
  });
};