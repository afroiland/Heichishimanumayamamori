var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config.js');

var connectToSQLDatabase = function() {
  pg.connect(connectionString);

  // pg.connection.on('connected', function () {
  //   console.log('pg connected to ', connectionString);
  // });
  //
  // pg.connection.on('error', function (err) {
  //   console.log('pg failed to connect because error: ', err);
  // });
}

module.exports = { connect: connectToSQLDatabase };
