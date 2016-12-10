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
    // console.log('Getting players');
    client.query('SELECT * FROM players', function(err, result) {
      done();
      if(err) {
        res.sendStatus(500);
      }
      res.send(result.rows);
      // console.log('result.rows: ', result.rows);
    });
  });
});

router. put('/:id', function(req, res) {
  playerID = req.params.id;
  player = req.body;
  // console.log('playerID: ', playerID);
  // console.log('player to update: ', player);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('UPDATE players SET tourney_points=$1 WHERE id=$2',
    [player.new_point_total, playerID],
    function(err, result) {
      if(err) {
        console.log('update error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

module.exports = router;
