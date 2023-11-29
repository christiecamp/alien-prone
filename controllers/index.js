const router = require('express').Router();
const api = require('./api');
const home = require('./home');
const dashboard = require('./dashboard');


router.use('/', home);
router.use('/api', api);
router.use('/dashboard', dashboard)

// router.use((req, res) => {
//     res.status(404).end();
// });


module.exports = router;