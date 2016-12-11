var verbose = true;

var express = require('express');
var admin = require("firebase-admin");
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

if (verbose) {console.log('decoder running')};

admin.initializeApp({
  credential: admin.credential.cert("./server/firebase-service-account.json"),
  databaseURL: "https://ytbnmtgfpsa.firebaseio.com"
});

var tokenDecoder = function(req, res, next){
  if (verbose) {console.log('req.headers.id_token: ', req.headers.id_token)};
  if (req.headers.id_token == undefined){
    res.sendStatus(403);
    //might want to uncomment next line for testing
    // next();
  } else {
    admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
      // Adding the decodedToken to the request so that downstream processes can use it
      console.log('decoded token: ', decodedToken);
      pg.connect(connectionString, function(err, client, done) {
        if(err) {
          console.log('connection error: ', err);
          res.sendStatus(500);
        }
        client.query('SELECT id FROM users WHERE email = $1',
        [decodedToken.email],
        function(err, result) {
          done();
          if(err) {
            res.sendStatus(500);
          } else {
          // res.send(result.rows);
          req.userId = result.rows[0].id;
          console.log('userId: ', req.userId);
          console.log('result.rows: ', result.rows);
          console.log('decodedToken: ', decodedToken);
          req.decodedToken = decodedToken;
          next();
          }
        });
      });
    })
    .catch(function(error) {
      // If the id_token isn't right, you end up in this callback function
      // Here we are returning a forbidden error
      console.log('User token could not be verified', error);
      res.send(403);
    });
  };
}

module.exports = { token: tokenDecoder };
