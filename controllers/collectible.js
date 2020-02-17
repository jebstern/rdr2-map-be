const Collectible = require('../models/collectible');
const Location = require('../models/location');
const Group = require('../models/group');
const Category = require('../models/category');
const User = require('../models/user');
const {OAuth2Client} = require('google-auth-library');
const token = require('../token');


exports.collectible_update = function (req, res) {

    const collectible = new Collectible({
        collectibleId: req.body.collectibleId,
        found: req.body.found
    });

    var upsertData = collectible.toObject();

    // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
    delete upsertData._id;

    var query = {
        'collectibleId': req.body.collectibleId
    };

    Collectible.findOneAndUpdate(query, upsertData, {
        upsert: true
    }, function (err, doc) {
        if (err) {
            console.log('Error:');
            console.log(err);
            return res.status(500).send({
                mode: 'upsert',
                error: err
            });
        }
        return res.send("succesfully saved");
    });
};

exports.locations = function (req, res) {
    Location.find({}, function (err, users) {
        res.status(200).send(users);
    });
};

exports.groups = function (req, res) {
    Group.find({}, function (err, groups) {
        res.status(200).send(groups);
    });
};

exports.categories = function (req, res) {
    Category.find({}, function (err, categories) {
        res.status(200).send(categories);
    });
};

exports.toggle_location = function (req, res) {

    const locationId = Number(req.params.id)

    User.findOne({"username": req.params.username, "locations.id": locationId}, {locations: {$elemMatch: {id: locationId}}}, function (err, userData) {

        // Location not yet added to user -> Set as found
        if (userData == null) {
            User.update({username: req.params.username}, {$push: {locations: {id: locationId, found: true}}}, function(err, numAffected) {
                res.status(200).send({isFound: true});
            });
            return
        }
        
        isFound = !userData.locations[0].found;

        User.findOneAndUpdate({"username": req.params.username, "locations.id": locationId}, {$set : {"locations.$.found": isFound}}, function (err, doc) {
            if (err) {
                res.status(500).send({mode: 'upsert',error: err});
            }
            res.status(200).send({isFound});
        });
    });
};

exports.get_user = function (req, res) {
    const username = req.params.username;
    User.findOne({
        username
    }, function (err, userData) {
        if (userData != null && userData.locations != null) {
            res.status(200).send(userData.locations);
        } else {
            res.status(200).send([]);
        }
    });
};

exports.verifyToken = function (req, res) {
  verify(req.body.token)
    .then(resp => resp !== null ? res.status(200).send({token: resp}) : res.status(401).send())
    .catch(err => {
      console.log(err);
      res.status(401).send();
    });
};

async function verify (token) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID,
  });
  const payload = ticket.getPayload();
  const audience = payload['aud'];
  if (audience === process.env.GOOGLE_CLIENTID) {
    const userid = payload['sub'];
    jwtToken = generateUserToken(userid);
    return jwtToken
  } else {
    return null;
  }

};

// Generate the Token for the user authenticated in the request
function generateUserToken(userId) {
    return token.generateAccessToken(userId);
}
