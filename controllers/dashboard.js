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
            attributes: ['id', 'title', 'content'],
            include: [{
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }]
        });
        //serialize data
        const posts = postData.map((post) => post.get({ plan: true }));
        //render all posts by user id
        res.status(200).render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
        console.log(`
        ================================
        **** viewing abductee posts ****
        ================================  
                     _____
                  ,-"     "-.
                 / o       o \
                /   \     /   \
               /     )-"-(     \
              /     ( 6 6 )     \
             /       \ " /       \
            /         )=(         \
           /   o   .--"-"--.   o   \
          /    I  /  -   -  \  I    \
      .--(    (_}y/\       /\y{_)    )--.
     (    ".___l\/__\_____/__\/l___,"    )
      \                                 /
       "-._      o O o O o O o      _,-"
           '--Y--.___________.--Y--'
              |==.___________.==|
              '==.___________.==' 
        `);   
    } catch (err) {
        //
        res.status(500).json(err);
    }
});


//find user's post by id to edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne(req.params.id, {
            attributes: ['id', 'title', 'content'],
            include: [{
                model: User,
                attibutes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            }]
        });
        //serialize data
        const post = postData.get({ plain: true });
        if (!postData) {
            res.status(404).json({ message: 'no post found' });
            return;
        }
        res.status(200).render('edit-post', {
            post,
            logged_in: true
        });
        console.log(`
        ================================
        ******* post was edited! *******
        ================================
           
            .-""""-.        .-""""-.
           /        \      /        \
          /_        _\    /_        _\
         // \      / \\  // \      / \\
         |\__\    /__/|  |\__\    /__/|
          \    ||    /    \    ||    /
           \        /      \        /
            \  __  /        \  __  /
             '.__.'          '.__.'
              |  |            |  |
              |  |            |  |

        `);
    } catch (err) {
        res
            .status(500)
            .json(err);
            //.redirect('login');
        console.log(err);
    }
});


//new post by user
router.get('/new', withAuth, async (req, res) => {
    try {
        res.status(200).render('new-post', {
        });
        console.log(`
        ===============================
        ******* post was created! *****
        ===============================                          
 *          /\\              *               .
            \ \\  \__/ \__/ 
             \ \\ (oo) (oo)         .
       .      \_\\/~~\_/~~\_
             _.-~===========~-._           *
            (___/__________\___)    .
   .           /  \_______/  \                .
            *                     .
        `);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;