const router = require('express').Router();
const comment = require('./comment-route');
const post = require('./post-route');
const user = require('./user-route');

router.use('/comment', comment);
router.use('/post', post);
router.use('/user', user);

module.exports = router;
