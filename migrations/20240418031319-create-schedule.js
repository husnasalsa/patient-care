'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idDokter: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kuota: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hari: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
      },
      startTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      endTime: {
        allowNull: false,
        type: Sequelize.TIME
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
    await queryInterface.dropTable('Schedules');
  }
};