const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//api endpoints

//all posts
router.get ('/', async (req, res) => {
    try {
        //join with user data
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'date'],
            include:[{
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id', 'date'],
                include: {
                    model: User,
                    attributes: ['username']
            }},
            {
                model: User,
                attributes: ['username']
            }]
        });
        //serialize data
        const posts = postData.map((post) => post.get({ plain: true }));
        //render all posts
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
        console.log(`
        ============================
        ***** viewing all posts ****
        ============================
                     o   o
                      )-(
                     (O O)
                     '.=/'
                    ..-"-..
                   //.\ /.\\.
                 _//. / \ .\\.
                =./. {,-.}. \.=
                     || ||
                     || ||    
                   __|| ||__ 
                  '---" "---'
        `)
    } catch(err) {
        res.status(500).json(err);
        console.log(err);
    };
});


//post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'content', 'title', 'date'],
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: User,
                attributes: ['username']
            }]
        });
        //serialize data
        const post = postData.get({ plain: true });
        res.status(200).render('single-post', {
            post,
            logged_in: req.session.logged_in
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

//dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
        console.log(`
        ================================
        ** viewing abductee dashboard **
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
        res.status(500).json(err);
        console.log(err);
    }
});


//login
router.get('/login', (req, res) => {
  //redirect the request to another dashboard if user is already logged in
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
  //will need to move this to dashboard - keeping as placeholder
  console.log(`
  =========================================================
  **************** WELCOME BACK ABDUCTEE! *****************
  =========================================================
                                          _____________               
                                       __/_|_|_|_|_|_|_.__               
                                      /                   .    .           
                 .       ____________/  ____               .   :            
                 :    __/_|_|_|_|_|_(  |    |               )  |           
                 |   /               . | () |()  ()  ()  ()/   *          
                 *  /  ____           .|____|_____________/            
    .              (  |    |            ._______________/
    :               ', | () |()  ()  ()    .___________/
    |                '.|____|____________ /   .______/     .
    *                  ',_______________/       .  /       :
          3         .    '.___________/         (__)       |    .
            3       :       '.______/            / .      *    :
             3      |         '.  /             /   .          |
              3     *          (__)            /     .          *
        ,,     3               /  .           /       .  
      w'..',___n___           /    .         /         .
      v..|Y/      /.         /      .       /           .
      '-Y/-'_____/  .       /        .     /             .
       '|-'      |  |      /          .   /               .
________|_|______|__|____ /____________._/_________________.__
  `);
});


//signup
router.get('/signup', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signup');
});

module.exports = router;