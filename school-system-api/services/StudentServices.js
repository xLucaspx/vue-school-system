const { DatabaseError } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../errors");
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
}

module.exports = StudentServices;
