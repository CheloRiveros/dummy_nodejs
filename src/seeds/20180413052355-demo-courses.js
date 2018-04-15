'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [{
        code: 'IIC2513',
        name: 'Aplicaciones Web',
        description: 'demo@demo.com',
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
