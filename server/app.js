// var admin = require("firebase-admin");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var privateData = require('./routes/private-data');
var pgConnection = require('./modules/pg-connection');
var roster = require('./routes/roster');
var leaderboard = require('./routes/leaderboard');
var about = require('./routes/about');
var port = 3000;

app.set("port", (process.env.PORT || port));

app.use('/roster', roster);
app.use('/leaderboard', leaderboard);
app.use('/about', about);
app.use('/privateData', privateData);

app.use(express.static(path.resolve('./public')));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.use(decoder.token);

app.get('/home', function(req, res) {
    res.send("hello from the server");
});

pgConnection.connect();

app.listen(app.get("port"), function(){
    console.log("Server up and running on Port", port);
});
