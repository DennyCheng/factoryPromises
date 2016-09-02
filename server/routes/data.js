var express = require('express');
var router = express.Router();
var pg = require('pg');
var connect = require='postgres://localhost:5432/omicron';


router.get('/', function(req, res) {
  var results = [];

  pg.connect(connect, function(err, client, done) {
    client.query('SELECT * FROM people',
    function(err, result) {
      done();
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    });
  });
});

router.post('/', function(req, res) {
  var person = req.body.name;
  pg.connect(connect, function(err, client, done) {
    client.query('INSERT INTO people (name) ' +
    'VALUES ($1)',
    [person],
    function(err, result) {
      done();
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  })
});

module.exports = router;
