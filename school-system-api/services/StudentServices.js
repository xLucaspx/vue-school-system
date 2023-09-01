const { DatabaseError, UniqueConstraintError } = require("sequelize");
const { NotFoundError, BadRequestError, ConflictError } = require("../errors");
const db = require("../models");

class StudentServices {
  constructor() {
    this.modelName = "student";
  }

  async getStudents(where = {}) {
    try {
      return await db[this.modelName].findAll({ where: { ...where } });
    } catch (error) {
      if (error instanceof DatabaseError)
        throw new BadRequestError("Invalid where clause!");

      throw error;
    }
  }

  async getOneStudent(where = {}) {
    try {
      const student = await db[this.modelName].findOne({ where: { ...where } });

      if (student) return student;

      throw new NotFoundError("Student not found!");
    } catch (error) {
      if (error instanceof DatabaseError)
        throw new BadRequestError("Invalid where clause!");

      throw error;
    }
  }

  async createStudent(data) {
    try {
      return await db[this.modelName].create(data);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const { fields } = error;

        if (!fields)
          throw new BadRequestError(
            "Please, check if all the fields are filled correctly!"
          );

        if (fields.PRIMARY)
          throw new ConflictError(
            `The ID ${fields.PRIMARY} is already registered!`
          );

        if (fields.cpf)
          throw new ConflictError(
            `The CPF ${fields.cpf} is already registered!`
          );
      }
      throw error;
    }
  }

  async updateStudent(id, data) {
    try {
      const student = await this.getOneStudent({ id });

      if (data.id && data.id != student.id)
        throw new ConflictError("It's not allowed to alter the student's ID!");

      return await student.update(data);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const { fields } = error;

        if (!fields)
          throw new BadRequestError(
            "Please, check if all the fields are filled correctly!"
          );

        if (fields.cpf)
          throw new ConflictError(
            `The CPF ${fields.cpf} is already registered!`
          );
      }
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      const student = await this.getOneStudent({ id });
      return await student.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StudentServices;
