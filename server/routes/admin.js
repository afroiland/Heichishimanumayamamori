var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/players', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('Could not connect to db to get players');
      res.sendStatus(500);
    }
    console.log('Getting players');
    client.query('SELECT * FROM players', function(err, result) {
      done();
      if(err) {
        res.sendStatus(500);
      }
      res.send(result.rows);
      console.log('result.rows: ', result.rows);
    });
  });
});

module.exports = router;
