const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

//seeds
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    //sync database with sequelize
    await sequelize.sync({ force: true });

    //password is hashed using hooks defined in user model
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);
    process.exit(0);
};
    
seedDatabase();
