const router = require('express').Router();
const comment = require('./comment');
const post = require('./post');
const user = require('./user');

router.use('/comment', comment);
router.use('/post', post);
router.use('./user', user);

module.exports = router;
