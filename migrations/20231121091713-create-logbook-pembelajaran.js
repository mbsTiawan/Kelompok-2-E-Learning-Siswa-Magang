'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logbook_Pembelajarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_materi: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materi_Mentorings',
          key: 'id'
        }
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      catatan: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logbook_Pembelajarans');
  }
};