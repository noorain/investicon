var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    Retsly = require('js-sdk'),
    moment = require('moment');

var router = express.Router();

var retsly = Retsly.create('7552534cac1f9710aa6d1a47a61e794c' ,['armls']);
router.get('/', function(req, res, next) {
  var limit = "1" // req.param('id');
  var zipCode =  "85225"; // req.param('token');
  

  var key = "votes" + moment().format('YYYYMMDD');

  res.setHeader('Content-Type', 'application/json');
  var listings = [];
  var QueryFor = {}
      QueryFor.zipCode =  '85225'; 
  retsly.listings().query(QueryFor).getAll(function (err, data) {
        if (!data.success) {
          res.status(500).send(err);
          return
        }
        for (var id in data.bundle) {
          var listing = data.bundle[id]
          listings.push(listing);
        }

        return res.send({"listings": listings});

      });
 });

  

module.exports = router;
