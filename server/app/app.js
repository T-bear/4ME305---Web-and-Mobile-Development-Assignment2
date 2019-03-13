const express = require('express');
const mongodb = require('mongodb');
const fileUpload = require('express-fileupload');

const app = express();

// Extend the basic Express features
app.use(express.static('public'));
// use 'extended' to avoid deprecation warning
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles: true}));

// Static DB settings
const url = "mongodb://localhost:27017";
const db_nameImg = "Userimage";
const collection_nameImg = "images";
const db_nameUsr = "User";
const collection_nameUsr = "users"
// avoid deprecation warning
const opt = {useNewUrlParser: true};

// This will hold the collection as a global, for use in the whole app
var collection;

// Initialize connection once
mongodb.MongoClient.connect(url, opt, function(err, client) {
  if(err) throw err;

  const db = client.db(db_name);
  
  // Save the collection in the global var
  collection = db.collection(collection_name);

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

// The root is "read" for CRUD
app.get('/', function(req, res) {
    res.send('hello world')
});

// Create (from CRUD)
app.get('/create', function(req, res) {

});

// This is also Create (from CRUD)
app.post('/create', function(req, res) {

});

app.get('/delete/:id', function(req, res) {

});
