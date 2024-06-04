'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
        validate: {
          isEmail:true
        },
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: { 
           args: [5, 20],
           msg: "The password length should be between 5 and 20 characters."
        }
      },
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPass = hashPassword(user.password)
        user.password = hashedPass
      }
    }
  });
  return User;
};