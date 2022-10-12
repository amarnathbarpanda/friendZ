const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();
console.log('Router loaded');

// accessing users routes , for further routes, access from here
// router.use('/routerName', require('./routerFile'));

router.use('/users', require('./users'));

router.get('/', homeController.home);

module.exports = router;