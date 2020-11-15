'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Admins', 'role', { type: Sequelize.STRING }),
      queryInterface.addColumn('Customers', 'role', { type: Sequelize.STRING }),
      queryInterface.addColumn('Outlets', 'image_url', { type: Sequelize.STRING })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Admins', 'role'),
      queryInterface.removeColumn('Customers', 'role'),
      queryInterface.removeColumn('Outlets', 'image_url')
    ])
  }
};
