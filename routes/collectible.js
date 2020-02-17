const express = require('express');
const router = express.Router();
const passport = require('passport');
const collectible_controller = require('../controllers/collectible');


router.get('/locations', collectible_controller.locations);
router.get('/groups', collectible_controller.groups);
router.get('/categories', collectible_controller.categories);
router.get('/users/:username', passport.authenticate(['jwt'], { session: false }), collectible_controller.get_user);
router.put('/:id/update', passport.authenticate(['jwt'], { session: false }), collectible_controller.collectible_update);
router.put('/:username/:id', passport.authenticate(['jwt'], { session: false }), collectible_controller.toggle_location);
router.post('/verifyToken', collectible_controller.verifyToken);

module.exports = router;