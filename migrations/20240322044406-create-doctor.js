'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      spesialis: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alamatPraktek: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telepon: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      srcFoto: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hargaKonsultasi: {
        allowNull: false,
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
    await queryInterface.dropTable('Doctor');
  }
};