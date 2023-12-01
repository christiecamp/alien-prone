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
           .,,------.._
        ,'"   _      _   "'.
       /.__, ._  -=- _"'    Y
      (.____.-.'      ""'   j
       VvvvvvV'.Y,.    _.,-'       ,     ,     ,
          Y    ||,   '"\         ,/    ,/    ./
          |   ,'  ,     '-..,'_,'/___,'/   ,'/   ,
     ..  ,;,,',-'"\,'  ,  .     '     ' ""' '--,/    .. ..
   ,'. '.'---'     ', /  , Y -=-    ,'   ,   ,. .'-..||_|| ..
  ff\\'. '._        /f ,'j j , ,' ,   , f ,  \=\ Y   || ||'||_..
  l' \' '.''."'-..,-' j  /./ /, , / , / /l \   \=\l   || '' || ||...
   '  '   '-._ '-.,-/ ,' /'"/-/-/-/-"'''"'.'.  ''.\--''--..''_'' || ,
              "'-_,',  ,'  f    ,   /      ''._    ''._     ,  -.'/'/         ,
            ,-"'' _.,-'    l_,-'_,,'          "'-._ . "'. /|     '.'\ ,       |
          ,',.,-'"          \=) ,'-.         ,    '-'._'.V |       \ // .. . /j
          |f\\               '._ )-."'.     /|         '.| |        '.'-||-\\/
          l' \'                 "'._   "'--' j          j' j          '-'---'
           '  '                     "',-  ,'/       ,-'"  /
                                   ,'",__,-'       /,, ,-'
                                   Vvv'            VVv'
        `);   
    } catch (err) {
        //
        res.status(500).json(err);
    }
});


//find user's post by id to edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
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
 *          /.l              *               .
            . .l  ;__; ;__;
             . .l (oo) (oo)         .
       .      ._.l/~~;_/~~;_
             _.-~===========~-._           *
            (___/__________.___)    .
   .           v  ._______/  v               .
            *                     .
        `);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;