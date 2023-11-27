const router = require('express').Router();
const { User } = require('../../models');


//signup
router.post('/', async (req, res) => {
    try {
        //new user
        const newAbductee = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newAbductee.id,
            req.session.username = newAbductee.username,
            req.session.logged_in = true,

            res.status(200).json(userData);
        });
        console.log(`
        =========================================================
        ***************** WELCOME to ALIEN PRONE! ***************
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
        const abductee = await User.findOne({ where: { username: req.body.username } });

        if (!abductee) {
            res
                .status(400)
                .json({ message: 'incorrect username or password - please try again' });
            return;
        }

        const password = await abductee.checkPassword(req.body.password);

        if(!password) {
            res
                .status(400)
                .json({ message: 'incorrect username or password - please try again' });
            return;         
        }

        req.session.save(() => {
            req.session.user_id = abductee.id;
            req.session.username = abductee.username;
            req.session.logged_in = true;

            res
                .status(200)
                .json({ abductee, message: `you are now logged in!` });
        });
        console.log(`
        =========================================================
        ************** WELCOME BACK ${abductee.username}! ****************
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
                       /___   ___\
                      //@@@\ /@@@\\
                      \\@@@/ \@CC//
                       \___ " ___/
                          | - |
                           \_/    
        `);
    } else {
        res.status(404).end();
    }
});

module.exports = router;