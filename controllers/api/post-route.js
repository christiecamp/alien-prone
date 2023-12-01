const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get api/post/
router.get('/', withAuth, async (req, res) => {
    try {
        //all posts by user id
        const posts = await Post.findAll({
            attributes: ['id', 'title', 'content'],
            // order: [['created_at', 'DESC']],
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', 'description', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        });
        res.status(200).json(posts);
        console.log(`
        ================================
        **** viewing abductee posts ****
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


//get by id
router.get('/:id', async (req,res) => {
    try {
    const post = await Post.findbyPk(req.params.id, {
        attributes: ['id', 'title', 'content'],
        include: [{
            model: User,
            attribues: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'description', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    });
    if (!post) {
        res.status(404).json({ message: `id not found` });
        return;
    }
    res.status(200).json(post);
    console.log();
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }

});


//create post
router.post('/', withAuth, async (req, res) => {
    try {
        //new post
        const post = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(post);
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


//update post
router.put('/:id', withAuth, async (req,res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        //validate
        if (!updatedPost) {
            res.status(404).json({ message: `id not found` });
            return;
        }
        res.status(200).json(updatedPost);
        console.log(`
            =================================
            ******* post was updated! *******
            =================================
                         .--.   |V|
                        /    \ _| /
                        q .. p \ /
                         \--/  //
                        __||__//
                       /.    _/
                      // \  /
                     //   ||
                     \\  /  \
                      )\|    |
                     / || || |
                     |/\| || |
                        | || |
                        \ || /
                      __/ || \__
                     \____/\____/
        `);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


//delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        //validate 
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