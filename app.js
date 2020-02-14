const express = require('express');
const bodyParser = require('body-parser');
const collectible = require('./routes/collectible');
var mongoose = require('mongoose');
const app = express();
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
const DEV_DB_URL = 'mongodb://localhost/rdr2map';
const PROD_DB_URL = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@cluster0-z1tm1.mongodb.net/rdr2map?retryWrites=true&w=majority`;
const mongoDB = process.env.NODE_ENV === 'production' ? PROD_DB_URL : DEV_DB_URL;
const PORT = process.env.PORT || 1234

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


app.listen(PORT, () => {
    console.log('Server is up and running on port number ' + PORT);
});


