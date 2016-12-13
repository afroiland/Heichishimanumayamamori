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
var admin = require('./routes/admin');
var login = require('./routes/login');
var port = 3000;

app.set("port", (process.env.PORT || port));

app.use(express.static(path.resolve('./public')));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.use('/login', login);
app.use('/leaderboard', leaderboard);
app.use('/about', about);
app.use('/admin', admin);

app.use(decoder.token);

app.use('/roster', roster);
app.use('/privateData', privateData);

app.get('/home', function(req, res) {
  res.send("hello from the server");
});

pgConnection.connect();

app.listen(app.get("port"), function(){
  console.log("Server up and running on Port", port);
});
