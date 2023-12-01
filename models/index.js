//import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
});

//user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//post belong to user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//coments belong to user
Comment.belongsTo(User, {
    foriegnKey: 'user_id',
    onDelete: 'CASCADE'
});

//post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

//coments belong to post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});


module.exports = { 
    User, 
    Post, 
    Comment,
};
