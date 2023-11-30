const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//all comments
router.get('/', async (req,res) => {
    try {
        const comments = await Comment.findAll({
            attributes: ['id', 'description', 'post_id'],
        });
        res.status(200).json(comments);
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


//comment by id
router.get('/:id', async (req,res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(!comment) {
            res.status(404).json({ message: `id not found` });
            return;
        }
        res.status(200).json(comment);
        console.log(`
        ===============================
        **** viewing comment by id! ***
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


//new comment
router.post('/', withAuth, async (req,res) => {
    try {
        //new comment
        const comment = await Comment.create({
            description: req.body.description,
            post_id: req.body.post_id,
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

//update comment
router.put('/:id', withAuth, async (req,res) => {
    try {
        //update comment
        const comment = await Comment.update({
            description: req.body.description,
            id: req.params.id,
        })
        if(!comment) {
            res.status(404).json({ message: `id not found` });
            return;
        }
        res.status(200).json(comment);
        console.log(`
        ===============================
        ***** comment was updated! ****
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