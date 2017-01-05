var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config.js');

router.get('/', function(req, res) {
  console.log('get request');
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT DISTINCT first_name, last_name, SUM(tourney_points) FROM players JOIN users ON players.user_id = users.id WHERE players.user_id = users.id GROUP BY first_name, last_name ORDER BY sum DESC',
      function(err, result) {
      done();
      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      // console.log('result.rows: ', result.rows);
      res.send(result.rows);
    });
  });
});



module.exports = router;
