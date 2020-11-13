'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint("Queues", {
        fields: ["CustomerId"],
        type: "foreign key",
        name: "custom_fkey_CustomerId",
        references: { //Required field
          table: "Customers",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }),
      queryInterface.addConstraint("Queues", {
        fields: ["OutletId"],
        type: "foreign key",
        name: "custom_fkey_OutletId",
        references: { //Required field
          table: "Outlets",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint("Queues", "CustomerId"),
      queryInterface.removeConstraint("Queues", "OutletId")
    ])
  }
};
