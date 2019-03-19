const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const io = require('socket.io')();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/lastAssignment";

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lastAssignment'
});
 
// connect to database
mc.connect();

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    io.on('connection', function(socket){
        socket.on('login', function(res){
            // const collection = client.db("lastAssig").collection("users");
            console.log(res.email);
            var dbo = db.db("lastAssignment");
            var user = { email: res.email };
            dbo.collection("users").insertOne(user, function(err, res) {
                if (err) throw err;
                console.log(res.email + 'added to the database');
                db.close();
            });   
        });
    });
});
/*  
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://Finlirare:student@cluster0-a8qtl.mongodb.net/Cluster0?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    var db;

    client.connect(function(err, client) {
      if (err) {
        throw err;
      } else {
        io.on('connection', function(socket){
          const collection = client.db("Cluster0").collection("users");
          socket.on('login', function(res){
              collection.insertOne({
                  email: res.email,
              });
          });
        });
      }
      client.close();
    });
*/

// perform actions on the collection object  
  io.listen(3001);
  app.listen(3000, function(){
      console.log("Listening on port 3000");
  });

//EXPRESS
    // Extend the basic Express features
    app.use(express.static('../../src'));
    // use 'extended' to avoid deprecation warning
    app.use(express.urlencoded({extended: true}));
    app.use(fileUpload({useTempFiles: true}));
    app.get('*', function (req, res) { });
    // The root is "read" for CRUD
    app.get('/tabs/tab1', function(req, res, next) { });
    // Create (from CRUD)
    app.get('/create', function(req, res) { });
    // This is also Create (from CRUD)
    app.post('/addImg', function(req, res) {
        const userID = '';
        const long = '';
        const lat = '';
        const image = req.files.image;
        // Save the new picture in the DB
        const doc = {"userID": userID, "long": long, "lat": lat, "image": image };
        collection.insertOne(doc, function(err) {        
            if (err) console.log(err);
            image.mv('public/images/' + doc._id, function(err) {
                if (err) console.log(err);
            });        
        });
    });
  app.get('/delete/:id', function(req, res) { });

  app.get('/test_sessions', function (req, res) {
    mc.query('SELECT * FROM lastAssignment', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Test_Session' });
    });
});