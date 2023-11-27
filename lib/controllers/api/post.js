const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//create post
router.post('/', withAuth, async (req, res) => {
    try {
        //new post
        const post = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(post);
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

//update post


//delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: `id not found` });
            return;
        }
        res.status(200).json(postData);
        console.log(`
        =========================================================
        ********** post was removed from ALIEN PRONE ************
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