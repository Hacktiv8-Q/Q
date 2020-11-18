'use strict';
const outlets = require('../files/outlets.json')
outlets.forEach(elem => {
  elem.createdAt = new Date()
  elem.updatedAt = new Date()
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Outlets', outlets, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Outlets', null, {})
  }
};
