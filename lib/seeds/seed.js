const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

//seeds
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    //sync database with sequelize
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        //password is hased using hooks defined in user model
        individualHooks: true,
        returning: true,
    });

    const post = await Post.bulkCreate(postData, {
        //password is hased using hooks defined in user model
        individualHooks: true,
        returning: true,
    });
    
    const comment = await Comment.bulkCreate(commentData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();






   // for (const post of postData) {
    //     await Post.create({
    //         ...post,
    //         user_id: user[Math.floor(Math.random() * user.length)].id,
    //     });
    // };