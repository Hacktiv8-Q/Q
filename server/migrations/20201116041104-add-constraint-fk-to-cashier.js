'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Cashiers", {
      fields: ["OutletId"],
      type: "foreign key",
      name: "custom_fkey_OutletId",
      references: {
        table: "Outlets",
        field: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Cashiers", "OutletId")
  }
};
