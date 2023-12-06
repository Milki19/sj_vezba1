'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('proizvods',
    [
      {id:"1",naziv:"Megan", opis:"Psece", boja:"krem",cena: 15000, kategorija_id:1},
      {id:"2",naziv:"Giornno", opis:"Italian", boja:"Crna",cena: 36000, kategorija_id:2}
    ]);


    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Proizvod', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
