const express = require('express');
const bodyParser = require('body-parser');
const collectible = require('./routes/collectible');
var mongoose = require('mongoose');
const app = express();


let dev_db_url = 'mongodb://localhost/rdr2map';
const CONNECTION_URL = "mongodb+srv://rdr2mapuser:5qbjxIEGaUmEc7oE@cluster0-lzzkd.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "example";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback () {
    console.log("Connected to MongoDB");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use('/collectibles', collectible);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


