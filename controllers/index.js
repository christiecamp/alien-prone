const router = require('express').Router();
const api = require('./api');
const home = require('./home');
const dashboard = require('./dashboard');


router.use('/', home);
router.use('/api', api);
router.use('/dashboard', dashboard)


module.exports = router;