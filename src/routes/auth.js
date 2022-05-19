const attemptLoginAction = require('../actions/auth/attempt-login.action');
const loginAction = require('../actions/auth/login.action');

const router = require('express').Router();

router.get('/login', loginAction);
router.post('/login', attemptLoginAction);

module.exports = router;