'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedules', [{
      idDokter: 2,
      kuota: 4,
      hari: 'Senin',
      startTime: '12:00',
      endTime: '14:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idDokter: 5,
      kuota: 2,
      hari: 'Senin',
      startTime: '10:00',
      endTime: '13:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idDokter: 7,
      kuota: 11,
      hari: 'Rabu',
      startTime: '09:00',
      endTime: '15:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idDokter: 8,
      kuota: 8,
      hari: 'Jumat',
      startTime: '09:00',
      endTime: '11:30',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idDokter: 1,
      kuota: 7,
      hari: 'Kamis',
      startTime: '15:00',
      endTime: '19:30',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idDokter: 3,
      kuota: 4,
      hari: 'Selasa',
      startTime: '17:30',
      endTime: '20:30',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idDokter: 4,
      kuota: 11,
      hari: 'Rabu',
      startTime: '12:00',
      endTime: '19:30',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      idDokter: 1,
      kuota: 2,
      hari: 'Senin',
      startTime: '08:00',
      endTime: '10:30',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
