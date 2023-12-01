const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


//all user posts on dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        //all posts by user id
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'title', 'content', 'date'],
            include: [{
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id', 'date'],
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
=====================================================================
********************* VIEWING YOUR PROBE POSTS **********************
===================================================================== 
                                _____
                             ,-"     "-.
                            / o       o .
                           /   l     /   .
                          /     )-"-(     .
                         /     ( 6 6 )     .
                        /       l " /       .
                       /         )=(         .
                      /   o   .--"-"--.   o   .
                     /    I  /  -   -  l  I    .
                 .--(    (_}y/l       /ly{_)    )--.
                (    ".___l.l__l_____/__l/l___,"    )
                 l                                 /
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
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'date'],
            include: [{
                model: User,
                attibutes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id', 'date'],
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
=====================================================================
********************** PROBE POST WAS CREATED ***********************
=====================================================================
            _                      _______                      _
        _dMMMb._              .adOOOOOOOOOba.              _,dMMMb_
       dP'  ~YMMb            dOOOOOOOOOOOOOOOb            aMMP~  'Yb
       V      ~"Mb          dOOOOOOOOOOOOOOOOOb          dM"~      V
                'Mb.       dOOOOOOOOOOOOOOOOOOOb       ,dM'
                 'YMb._   |OOOOOOOOOOOOOOOOOOOOO|   _,dMP'
            __     'YMMM| OP'~"YOOOOOOOOOOOP"~'YO |MMMP'     __
          ,dMMMb.     ~~' OO     'YOOOOOP'     OO '~~     ,dMMMb.
       _,dP~  'YMba_      OOb      'OOO'      dOO      _aMMP'  ~Yb._
      
                   'YMMMMl'OOOo     OOO     oOOO'/MMMMP'
           ,aa.     '~YMMb 'OOOb._,dOOOb._,dOOO'dMMP~'       ,aa.
         ,dMYYMba._         'OOOOOOOOOOOOOOOOO'          _,adMYYMb.
        ,MP'   'YMMba._      OOOOOOOOOOOOOOOOO       _,adMMP'   'YM.
        MP'        ~YMMMba._ YOOOOPVVVVVYOOOOP  _,adMMMMP~       'YM
        YMb           ~YMMMMl'OOOOI'''''IOOOOO'/MMMMP~           dMP
         'Mb.           'YMMMb'OOOI,,,,,IOOOO'dMMMP'           ,dM'
           ''                  'OObNNNNNdOO'                   ''
                                 '~OOOOO~'
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
=====================================================================
********************** PROBE POST WAS CREATED ***********************
=====================================================================
            _                      _______                      _
        _dMMMb._              .adOOOOOOOOOba.              _,dMMMb_
       dP'  ~YMMb            dOOOOOOOOOOOOOOOb            aMMP~  'Yb
       V      ~"Mb          dOOOOOOOOOOOOOOOOOb          dM"~      V
                'Mb.       dOOOOOOOOOOOOOOOOOOOb       ,dM'
                 'YMb._   |OOOOOOOOOOOOOOOOOOOOO|   _,dMP'
            __     'YMMM| OP'~"YOOOOOOOOOOOP"~'YO |MMMP'     __
          ,dMMMb.     ~~' OO     'YOOOOOP'     OO '~~     ,dMMMb.
       _,dP~  'YMba_      OOb      'OOO'      dOO      _aMMP'  ~Yb._
      
                   'YMMMM\`OOOo     OOO     oOOO'/MMMMP'
           ,aa.     '~YMMb 'OOOb._,dOOOb._,dOOO'dMMP~'       ,aa.
         ,dMYYMba._         'OOOOOOOOOOOOOOOOO'          _,adMYYMb.
        ,MP'   'YMMba._      OOOOOOOOOOOOOOOOO       _,adMMP'   'YM.
        MP'        ~YMMMba._ YOOOOPVVVVVYOOOOP  _,adMMMMP~       'YM
        YMb           ~YMMMM\'OOOOI'''''IOOOOO'/MMMMP~           dMP
         'Mb.           'YMMMb'OOOI,,,,,IOOOO'dMMMP'           ,dM'
           ''                  'OObNNNNNdOO'                   ''
                                 '~OOOOO~'
        `);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;