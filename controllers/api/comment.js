const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//all comments
router.get('/', async (req,res) => {
    try {
        const comment = await Comment.findAll({
            attributes: ['id', 'description', 'created_at'],
        });
        res.status(200).json(comment);
        console.log(`
        ============================
        *** viewing all comments! **
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


//delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        //validate
        if (!commentData) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        res.status(200).json(commentData);
        console.log(`
        =========================================================
        ******* comment was removed from ALIEN PRONE post *******
        =========================================================
                        o
                        \_/\o
                        ( Oo)                    \|/
                        (_=-)  .===O-  ~~Z~A~P~~ -O-
                        /   \_/U'                /|\
                        ||  |_/
                        \\  |
                        {K ||
                         | CC
                         | ||
                         (__\\                          
        `);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;