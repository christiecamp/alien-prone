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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,15],
            }
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
            beforeCreate: async (newAbductee) => {//new user output
                newAbductee.password = await bcrypt.hash(newUserData.password, 10);
                return newAbductee;
            },
            beforeUpdate: async (updatedAbductee) => {//updated user output
                updatedAbductee.password = await bcrypt.hash(updatedAbductee.password, 10);
                return updatedAbductee;
            },
        }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;