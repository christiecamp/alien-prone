const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//all posts
router.get ('/', async (req, res) => {
    try {
        //join with user data
        const postData = await Post.findAll({
            include: [User],
        });
        //serialize data
        const posts = postData.map((post) => post.get({ plain: true }));
        //render all posts
        res.status(200).render('homepage', {
            posts,
            logged_in: req.sssion.loggin_in
        });
        console.log(`

        ============================
        ***** viewing all posts ****
        ============================
                    o   o
                     )-(
                    (O O)
                     \=/
                    .-"-.
                   //\ /\\
                 _// / \ \\_
                =./ {,-.} \.=
                    || ||
                    || ||    
                  __|| ||__ 
                 '---" "---'
        `);
    } catch(err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
				User,
				{
					model: Comment,
					include: [User],
				},
			],
        });
        //serialize data
        const post = postData.get({ plain: true });
        //
        res.status(200).render('post', {
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
        const abducteeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project}],
        });

        const abductee = abducteeData.get({ plain: true });

        res.render('dashboard', {
            ...abductee,
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
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//signup
router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}
	res.render('signup');
});

module.exports = router;