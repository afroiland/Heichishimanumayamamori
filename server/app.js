var express = require('express');
var app = express();
var path = require('path');
var roster = require('./routes/roster');
var leaderboard = require('./routes/leaderboard');
var about = require('./routes/about');
var port = 3000;

app.set("port", (process.env.PORT || port));

app.use('/roster', roster);

app.use('/leaderboard', leaderboard);

app.use('/about', about);

app.use(express.static(path.resolve('./public')));

app.get('/home', function(req, res) {
    res.send("hello from the server");
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.listen(app.get("port"), function(){
    console.log("Server up and running on Port", port);
});
