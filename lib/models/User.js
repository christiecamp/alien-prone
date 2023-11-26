const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class User extends Model {}

User.init(
//id
//username
//password
//hooks
//sequelize
);

module.exports = User;