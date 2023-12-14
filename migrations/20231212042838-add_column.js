"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("logbook_pembelajaran", "id_asisten", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Asisten",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("logbook_pembelajaran", "id_asisten");
  },
};
