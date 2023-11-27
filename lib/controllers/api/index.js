const router = require('express').Router();
const comment = require('./comment');
const post = require('./post');
const abductee = require('./user');

router.use('/comment', comment);
router.use('/post', post);
router.use('./user', abductee);

module.exports = router;
