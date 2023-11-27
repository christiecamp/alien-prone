const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


//all posts
router.get('/', withAuth, async (req, res) => {
    try {
        //all posts by user id
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [User],
        });
        //serialize data
        const posts = postData.map((post) => post.get({ plan: true }));
        //render all posts by user id
        res.status(200).render('userPosts', {
            layout: 'dashboard',
            posts,
            logged_in: req.session.logged_in
        });     
    } catch (err) {
        res.redirect('login');
    }
});




module.exports = router;