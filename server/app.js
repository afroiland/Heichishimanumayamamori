var express = require('express');
var app = express();
var path = require("path");
var port = 3000;

app.set("port", (process.env.PORT || port));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.listen(app.get("port"), function(){
    console.log("Server up and running on Port", port);
});
