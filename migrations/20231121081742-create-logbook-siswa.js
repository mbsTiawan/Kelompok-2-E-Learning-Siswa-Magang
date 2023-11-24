'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logbook_Siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Siswas',
          key: 'id'
        }
      },
      id_asisten: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Asistens',
          key: 'id'
        }
      },
      tanggal: {
        type: Sequelize.DATE
      },
      materi: {
        type: Sequelize.STRING
      },
      catatan: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Logbook_Siswas');
  }
};