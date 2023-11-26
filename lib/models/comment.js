const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
//id
//comment content
//date
//post_id?
//user_id
//sequelize
);

module.exports = Comment;