"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Logbook_Pembelajarans", "id_asisten", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Asistens",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Logbook_Pembelajarans", "id_asisten");
  },
};
