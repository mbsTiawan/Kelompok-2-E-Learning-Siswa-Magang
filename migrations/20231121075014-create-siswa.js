"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Siswas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_asisten: {
        type: Sequelize.INTEGER,
        references: {
          model: "Asistens",
          key: "id",
        },
      },
      id_sekolah: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sekolahs",
          key: "id",
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      nis: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      jurusan: {
        type: Sequelize.STRING,
      },
      tanggal_masuk: {
        type: Sequelize.DATE,
      },
      tanggal_keluar: {
        type: Sequelize.DATE,
      },
      tahun_ajaran: {
        type: Sequelize.STRING,
      },
      no_hp: {
        type: Sequelize.STRING,
      },
      no_hp_ortu: {
        type: Sequelize.STRING,
      },
      shift: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Siswas");
  },
};
