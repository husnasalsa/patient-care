'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Doctors', [{
      nama: "Rachel Purnawati",
      spesialis: "Sp. Kandungan & Kebidanan",
      alamatPraktek: "Kpg. Nangka No. 537",
      telepon: "0670 6773 6359",
      email: "kawaca66@laksmiwati.web.id",
      jadwal: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Sakura Kayla Namaga",
      spesialis: "Sp. Kulit & Kelamin",
      alamatPraktek: "Gg. Baja No. 100",
      telepon: "0588 8438 608",
      email: "narpati.mahfud@yahoo.com",
      jadwal: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Cahyono Irnanto Siregar",
      spesialis: "Sp. THT",
      alamatPraktek: "Jl. Raden No. 418",
      telepon: "(+62) 24 0909 780",
      email: "januar.putri@maryadi.asia",
      jadwal: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
