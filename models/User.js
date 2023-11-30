const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        }
    },
    {
        //instance hook - (also known as lifecycle events) functions which are called before and after calls in sequelize are executed; in this instance it will emit whenever a single object is edited
        hooks: {
            beforeCreate: async (userData) => {//new user output
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            beforeUpdate: async (updatedUser) => {//updated user output
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;