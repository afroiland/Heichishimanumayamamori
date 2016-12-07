var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function(req, res) {
  console.log('message on REC: ', req.message);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
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
