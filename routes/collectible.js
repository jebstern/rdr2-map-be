const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const collectible_controller = require('../controllers/collectible');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', collectible_controller.test);
router.get('/locations', collectible_controller.locations);
router.get('/groups', collectible_controller.groups);
router.get('/categories', collectible_controller.categories);
router.get('/users/:username', collectible_controller.get_user);
router.put('/:id/update', collectible_controller.collectible_update);
router.put('/:username/:id', collectible_controller.toggle_location);

module.exports = router;