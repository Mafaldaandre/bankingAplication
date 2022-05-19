const homeAction = require('../actions/home/home.action');
const router = require('express').Router();

router.get('/', homeAction);

module.exports = router;