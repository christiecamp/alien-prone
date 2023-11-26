const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

//seeds
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    //sync database with sequelize
    await sequelize.sync({ force: true });

    const abductee = await User.bulkCreate(userData, {
        //password is hased using hooks defined in user model
        individualHooks: true,
        returning: true,
    });
    
    
    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: abductee[Math.floor(Math.random() * abductee.length)].id,
        });
    };

    const comment = await Comment.bulkCreate(commentData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();