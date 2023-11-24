'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Submit_Tugas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tugas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tugas',
          key: 'id'
        }
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Siswas',
          key: 'id'
        }
      },
      name_file: {
        type: Sequelize.STRING
      },
      waktu_submit: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Submit_Tugas');
  }
};