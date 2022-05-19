const authRoutes = require('./auth');
const homeRoutes = require('./home');
const managerRoutes = require('./manager');
const userRoutes = require('./user');
const logoutRoutes = require('./logout');

const router = require('express').Router();

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/logout', logoutRoutes);
router.use('/manager', managerRoutes);
router.use('/user', userRoutes);

router.get('/*', (_, res) => {
    res.render('404')
});

module.exports = router;

