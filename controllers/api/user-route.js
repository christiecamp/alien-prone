const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


//all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(users);
        console.log(`
        ===============================
        ****** viewing all users! *****
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

//user by id
router.get('/:id', async (req,res) => {
    try {
        const user = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                model: Post,
                attributes: ['id', 'title', 'content']
            },
            {
               model: Comment,
               attributes: ['id', 'description'],
               include: {
                    model: Post,
                    attributes: ['title']
               }      
            },
            {
                model: Post,
                attributes: ['title'],
            }]
        });
        if (!user) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        res.status(200).json(user);
        console.log(`
        ===============================
        ***** viewing user by id! *****
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


//signup
router.post('/', async (req, res) => {
    try {
        //new user
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;

            res.status(200).json(user);
        });
        console.log(`
        =========================================================
        **************** WELCOME to ALIEN PRONE! ****************
        =========================================================
                                                _____________               
                                             __/_|_|_|_|_|_|_\__               
                                            /                   \    .           
                       .       ____________/  ____               \   :            
                       :    __/_|_|_|_|_|_(  |    |               )  |           
                       |   /               \ | () |()  ()  ()  ()/   *          
                       *  /  ____           \|____|_____________/            
          .              (  |    |            \_______________/
          :               \ | () |()  ()  ()    \___________/
          |                \|____|____________ /   \______/     .
          *                  \_______________/       \  /       :
                3         .    \___________/         (__)       |    .
                  3       :       \______/           /  \       *    :
                   3      |         \  /            /    \           |
                    3     *         (__)           /      \          *
              ,,     3              /  \          /        \
            w'\v',___n___          /    \        /          \
            v\`|Y/      /\        /      \      /            \
            '-Y/-'_____/  \      /        \    /              \
             '|-'      |  |     /          \  /                \
      ________|_|______|__|____/____________\/__________________\__
        `);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


//login
router.post('/login', async (req,res) => {
    try {
        //current user login
        const user = await User.findOne({ 
            where: { 
                username: req.body.username
            }
        });
        //validate login
        if (!user) {
            res
                .status(400)
                .json({ message: 'incorrect username or password - please try again' });
            return;
        }
        const password = await user.checkPassword(req.body.password);
        //validate password
        if(!password) {
            res
                .status(400)
                .json({ message: 'incorrect username or password - please try again' });
            return;         
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;

            res
                .status(200)
                .json({ user: user, message: `you are now logged in!` });
        });
        console.log(`
        =========================================================
        ************ WELCOME BACK TO ANOTHER PROBE! *************
        =========================================================
                                                _____________               
                                             __/_|_|_|_|_|_|_\__               
                                            /                   \    .           
                       .       ____________/  ____               \   :            
                       :    __/_|_|_|_|_|_(  |    |               )  |           
                       |   /               \ | () |()  ()  ()  ()/   *          
                       *  /  ____           \|____|_____________/            
          .              (  |    |            \_______________/
          :               \ | () |()  ()  ()    \___________/
          |                \|____|____________ /   \______/     .
          *                  \_______________/       \  /       :
                3         .    \___________/         (__)       |    .
                  3       :       \______/           /  \       *    :
                   3      |         \  /            /    \           |
                    3     *         (__)           /      \          *
              ,,     3              /  \          /        \
            w'\v',___n___          /    \        /          \
            v\`|Y/      /\        /      \      /            \
            '-Y/-'_____/  \      /        \    /              \
             '|-'      |  |     /          \  /                \
      ________|_|______|__|____/____________\/__________________\__
        `);
    } catch (err) {
        res.status(400).json(err);
    }
});


//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
        console.log(`
                     probe you later
                        _________
                       /___   ___l
                      //@@@l /@@@.l
                      ll@@@/ l@CC//
                       l___ " ___/
                          | - |
                           l_/    
        `);
    } else {
        res.status(404).end();
    }
});

module.exports = router;