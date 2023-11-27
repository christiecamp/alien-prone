const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


//all user's posts
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
        res.status(500).redirect('login');
    }
});


//find user's post by id to edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [User]
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });
        //serialize data
        const post = postData.get({ plain: true });
        if (!postData) {
            res.status(404).json({ message: 'no post found' });
            return;
        }
        res.status(200).render('edit', {
            layout: 'dashboard',
            post,
            logged_in: req.session.user_id,
        });
        console.log(`
        ================================
        ****** viewing post by id ******
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
        res.status(500).json(err);
        console.log(err);
    }
});


//new post by user
router.get('/new', withAuth, async (req, res) => {
    try {
        res.status(200).render('newPost', {
            layout: 'dashboard',
            logged_in: req.session.logged_in
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