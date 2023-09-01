"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("student", [
      {
        name: "Paula Souza",
        cpf: "09172834579",
        email: "paula@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "João Silva",
        cpf: "54850001262",
        email: "joaos@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marina Miranda",
        cpf: "89634526110",
        email: "marimir@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Maurício Souza",
        cpf: "82536271811",
        email: "mdsproducoescontato@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Guilherme Dias",
        cpf: "03647912255",
        email: "gui98dias@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Silvia Bonini",
        cpf: "11526649055",
        email: "silviabonimp@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Eduardo de Oliveira",
        cpf: "64534231628",
        email: "elduardo@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Andressa Mattos",
        cpf: "84736251450",
        email: "dessamtx@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Glauber Rocha",
        cpf: "85743631387",
        email: "grock@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cristina Braga",
        cpf: "00997685425",
        email: "dracris@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Julia Miranda Dias",
        cpf: "21735267740",
        email: "ju_miranda@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ivan Júnior",
        cpf: "73847238760",
        email: "junior.ivn@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Felipe César Vasques",
        cpf: "64738293001",
        email: "fe_ceva@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "José da Silva",
        cpf: "54541252376",
        email: "ze.silva@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Luíza Garcia",
        cpf: "12345678909",
        email: "lz-gcs@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("student", null);
  },
};
