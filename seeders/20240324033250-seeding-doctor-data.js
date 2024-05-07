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
      srcFoto: "d1.jpg",
      hargaKonsultasi: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Sakura Kayla Namaga",
      spesialis: "Sp. Kulit & Kelamin",
      alamatPraktek: "Gg. Baja No. 100",
      telepon: "0588 8438 608",
      email: "narpati.mahfud@yahoo.com",
      srcFoto: "d2.jpg",
      hargaKonsultasi: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Cahyono Irnanto Siregar",
      spesialis: "Sp. THT",
      alamatPraktek: "Jl. Raden No. 418",
      telepon: "(+62) 24 0909 780",
      email: "januar.putri@maryadi.asia",
      srcFoto: "d3.jpg",
      hargaKonsultasi: 300,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Juli Pertiwi",
      spesialis: "Sp. Anak",
      alamatPraktek: "Dk. Veteran No. 981",
      telepon: "(+62) 710 0468 9444",
      email: "dono97@prabowo.mil.id",
      srcFoto: "d4.jpg",
      hargaKonsultasi: 400,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Mulyono Marbun",
      spesialis: "Sp. Jantung dan Pembuluh Darah",
      alamatPraktek: "Jr. Suryo No. 607",
      telepon: "(+62) 317 6004 7802",
      email: "ajimat56@yahoo.co.id",
      srcFoto: "d5.jpg",
      hargaKonsultasi: 500,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Himawan Dongoran",
      spesialis: "Sp. Mata",
      alamatPraktek: "Gg. Raya Setiabudhi No. 167",
      telepon: "(+62) 535 1042 175",
      email: "salahudin.pardi@yahoo.com",
      srcFoto: "d6.jpg",
      hargaKonsultasi: 600,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Farhunnisa Halimah",
      spesialis: "Sp. Bedah",
      alamatPraktek: "Kpg. Honggowongso No. 997",
      telepon: "(+62) 258 7646 1458",
      email: "ibun.yulianti@puspita.org",
      srcFoto: "d7.jpg",
      hargaKonsultasi: 700,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Dwi Dabukke",
      spesialis: "Sp. Kesehatan Jiwa",
      alamatPraktek: "Psr. Lumban Tobing No. 321",
      telepon: "024 1353 0478",
      email: "garang.hassanah@rahayu.id",
      srcFoto: "d8.jpg",
      hargaKonsultasi: 800,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Zelda Wijayanti",
      spesialis: "Sp. Saraf",
      alamatPraktek: "Gg. Bakau No. 441",
      telepon: "(+62) 256 4057 445",
      email: "ihsan20@sihotang.com",
      srcFoto: "d9.jpg",
      hargaKonsultasi: 900,
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
