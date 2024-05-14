'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idDokter: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      waktu: {
        allowNull: false,
        validate: {
          customValidator(value) {
            if (new Date(value) < new Date()) {
              throw new Error("invalid date");
            }
          }
        },
        type: Sequelize.DATE
      },
      noUrut: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Appointments');
  }
};