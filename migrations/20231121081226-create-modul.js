'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Moduls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_asisten: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Asistens',
          key: 'id'
        }
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Kategoris',
          key: 'id'
        }
      },
      judul: {
        type: Sequelize.STRING
      },
      nama_file: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      tipe_file: {
        type: Sequelize.STRING
      },
      tanggal_upload: {
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
    await queryInterface.dropTable('Moduls');
  }
};