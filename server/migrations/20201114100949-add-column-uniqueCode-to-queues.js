'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Queues', 'uniqueCode', { type: Sequelize.STRING })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Queues', 'uniqueCode')
  }
};
