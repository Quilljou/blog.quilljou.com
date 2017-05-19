"use strict";
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}




module.exports = function User(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate (models) {
        User.hasMany(models.Task)
      }
    },
    instanceMethods: {
      comparePassword (password) {
        const hashedPw = this.password
        return bcrypt.compareSync(password, hashedPw);
      }
    }
  });




  User.beforeCreate(function(user, options) {
    return hashPassword(user.password).then(function (hashedPw) {
      user.password = hashedPw;
    });
  })


  return User;
};
