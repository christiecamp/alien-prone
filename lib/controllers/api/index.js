const router = require('express').Router();
const comment = require('./comment');
const login = require('./login');
const logout = require('./logout');
const post = require('./post');

//unsure if keeping usre route or move to dashboard
const abductee = require('./user');

router.use('/comment', comment);
router.use('/login', login);
router.use('/logout', logout);
router.use('/post', post);

module.exports = router;
