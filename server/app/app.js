const express = require('express');
const mongodb = require('mongodb');
const fileUpload = require('express-fileupload');
const passport = require('passport');

const app = express();

// Extend the basic Express features
app.use(express.static('public'));
// use 'extended' to avoid deprecation warning
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles: true}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static DB settings
const url = "mongodb://localhost:27017";
const db_nameImg = "Userimage";
const collection_nameImg = "images";
const db_nameUsr = "User";
const collection_nameUsr = "users"
// avoid deprecation warning
const opt = {useNewUrlParser: true};

var GoogleStrategy = require('passport-google-oauth20').Strategy;

// This will hold the collection as a global, for use in the whole app
var collection;

// Initialize connection once
mongodb.MongoClient.connect(url, opt, function(err, client) {
  if(err) throw err;

  const db = client.db(db_nameUsr);
  
  // Save the collection in the global var
  collection = db.collection(collection_nameUsr);

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

//Google strategy
passport.use(new GoogleStrategy({
    clientID: '604880648774-4qbuienc8391qcjktj78qkpnrqjt16pr.apps.googleusercontent.com',
    clientSecret: 'KvcJyJ4FVI4k3virSrtU5pMD',
    callbackURL: 'http://localhost:8100/auth/google/callback'
},
    function (accessToken, refreshToken, profile, done) {
        queryDatabase("INSERT IGNORE INTO user (email, Role_IDrole, Organization) VALUES ('" + profile.emails[0].value + "', 2, 1)");
        return done(null, profile);
       //});
    }
));

// The root is "read" for CRUD
app.get('/', function(req, res) {
    writeHeader(res);    
    res.write('<a href="/auth/google">google</a>')
    writeFooter(res);
});

// Create (from CRUD)
app.get('/create', function(req, res) {

});

// This is also Create (from CRUD)
app.post('/create', function(req, res) {

});

app.get('/delete/:id', function(req, res) {

});

//Authenticating Google login
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
            'email'] 
}));

app.get('/auth/google/callback', passport.authenticate('google',  { successRedirect: '/tab2',
                                                                    failureRedirect: '/tab1'}));

// Helper functions for printing common HTML

function writeHeader(res) {
    res.write('<html><body>');
    res.write('<h1>Picture Gallery</h1>');
}

function writeFooter(res) {
    res.write("<p><a href='/'>Home</a></p>")
    res.end();
}
