var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function(req, res) {
  // console.log('req', req);    //this is a massive console log
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    } else {
      // console.log('req.decodedToken: ', req.decodedToken);
      client.query('SELECT * FROM players WHERE user_id = $1',
      [req.userId],
      function(err, result) {
        done();
        if(err) {
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          // console.log('result.rows: ', result.rows);
        }
      });
    }
  });
});

router.post('/', function(req, res) {
  console.log('req.userId', req.userId);
  console.log('req.body: ', req.body.new_player);
  var playerFirstName = req.body.new_player.player_first_name;
  var playerLastName = req.body.new_player.player_last_name;
  var user_id = req.userId;
  // var userEmail = req.params.id;
  // console.log('newPLayer: ', newPlayer);
  // console.log('userEmail: ', userEmail);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'INSERT INTO players (player_first_name, player_last_name, tourney_points, user_id) ' +
      'VALUES ($1, $2, $3, $4)',
      [playerFirstName, playerLastName, 0, user_id],
      function(err, result) {
        done();
        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    });
  });

  router.delete('/:id', function(req, res) {
    console.log('req.params: ', req.params);
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

router.get('/check/', function(req, res) {
  // console.log('another req.userId: ', req.userId);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'SELECT COUNT(user_id) FROM players WHERE user_id = $1',
      [req.userId],
      function(err, result) {
        done();
        if(err) {
          res.sendStatus(500);
        } else {
          console.log('another result.rows: ', result.rows);
          res.send(result.rows);
        }
    });
  });
});

router.get('/checkAgain/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'SELECT * FROM players',
      function(err, result) {
      done();
      if(err) {
        res.sendStatus(500);
      } else {
        // console.log('again result.rows: ', result.rows);
        res.send(result.rows);
      }
    });
  });
});

module.exports = router;
