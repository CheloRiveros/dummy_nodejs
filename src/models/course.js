module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });
  Course.associate = function associate(models) {
    // associations can be defined here
  };
  return Course;
};