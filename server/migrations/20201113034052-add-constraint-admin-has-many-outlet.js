'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Outlets", {
      fields: ["AdminId"],
      type: "foreign key",
      name: "custom_fkey_AdminId",
      references: {
        table: "Admins",
        field: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Outlets", "AdminId")
  }
};
