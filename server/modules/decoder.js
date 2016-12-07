var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("./server/firebase-service-account.json"),
  databaseURL: "https://ytbnmtgfpsa.firebaseio.com"
});

var tokenDecoder = function(req, res, next){
  // console.log('req.headers.id_token: ', req.headers.id_token);
  if (req.headers.id_token == undefined){
    next();
  } else {
    admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
      // Adding the decodedToken to the request so that downstream processes can use it
      req.decodedToken = decodedToken;
      next();
    })
    .catch(function(error) {
      // If the id_token isn't right, you end up in this callback function
      // Here we are returning a forbidden error
      console.log('User token could not be verified');
      res.send(403);
    });
  }
}

module.exports = { token: tokenDecoder };
