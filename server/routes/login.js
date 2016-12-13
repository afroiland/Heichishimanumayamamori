var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    } else {
      client.query('SELECT email FROM users', function(err, result) {
        done();
        if(err) {
          console.log('Error: ', err);
          res.sendStatus(500);
        } else{
          console.log('results.rows: ', result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/', function(req, res) {
  var newUser = req.body;
  console.log('newUser: ', newUser);
  var firstName = newUser.displayName.split(' ')[0];
  var lastName = newUser.displayName.split(' ').slice(-1).join(' ');
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('INSERT INTO users (first_name, last_name, email, clearance_level) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, newUser.email, 1],
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


module.exports = router;
