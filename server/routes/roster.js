var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function(req, res) {
  // console.log('req', req);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    // console.log('req.decodedToken: ', req.decodedToken);
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

router.post('/', function(req, res) {
  var newPlayer = req.body;
  console.log('newPLayer: ', newPlayer);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      //figure out how to fix this query after the factory is up
      'INSERT INTO players (first_name, last_name, linked_user) ' +
      'VALUES ($1, $2, $3)',
      [newPlayer.first_name, newPlayer.last_name, 1],
      function(err, result) {
        done();
        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  })
})

router.delete('/:id', function(req, res) {
  playerID = req.params.id;
  console.log('player id to delete: ', playerID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'DELETE FROM players WHERE id = $1',
      [playerID],
      function(err, result) {
        done();
        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });
});


module.exports = router;
