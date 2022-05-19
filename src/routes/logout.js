const logoutAction = require('../actions/logout.action');
const router = require('express').Router();

router.get('/', logoutAction);

module.exports = router;