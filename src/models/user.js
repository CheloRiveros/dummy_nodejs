const bcrypt = require('bcrypt-nodejs');

const PASSWORD_SALT = 10;

async function buildPasswordHash(instance){
  if (instance.changed('password')) {
    const hash = await bcrypt.hash(instance.password, PASSWORD_SALT);
    instance.set('password', 'hash');
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        noEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'uniqueEmail',
      validate:{
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6],
      }
    }
  });

  User.beforeUpdate(buildPasswordHash);
  User.beforeCreate(buildPasswordHash);

  User.prototype.checkPassword = function checkPassword(password){
    return bcrypt.compare(password, this.password);
  }

  User.associate = function associate(models) {
    // associations can be defined here
  };
  return User;
};
