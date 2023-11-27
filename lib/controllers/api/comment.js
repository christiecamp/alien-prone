const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//all comments
router.get('/', async (req,res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User],
        });
        //serialize data
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.status(200).render('homepage', {
            comments,
            logged_in: req.session.loggin_in,
        });
        console.log(`
        ============================
        *** viewing all comments ***
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


//new comment
router.post('/', withAuth, async (req,res) => {
    try {
        //new comment
        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(comment);
        console.log(`
            ===============================
            ***** comment was created! ****
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




//post comment

//delete comment


module.exports = router;