const {
  DatabaseError,
  UniqueConstraintError,
  ValidationError,
} = require("sequelize");
const { NotFoundError, BadRequestError, ConflictError } = require("../errors");
const db = require("../models");

class StudentServices {
  constructor() {
    this.model = db.student;
  }

  async getStudents(where = {}) {
    try {
      return await this.model.findAll({ where: { ...where } });
    } catch (error) {
      if (error instanceof DatabaseError)
        throw new BadRequestError("Invalid where clause!");

      throw error;
    }
  }

  async getOneStudent(where = {}) {
    try {
      const student = await this.model.findOne({ where: { ...where } });

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
      return await this.model.create(data);
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

      if (error instanceof ValidationError) {
        if (!error.errors || error.errors.length === 0)
          throw new BadRequestError(
            "Please, check if all the fields are filled correctly!"
          );

        const errorData = error.errors.pop();

        if (errorData.path === "cpf")
          throw new BadRequestError(
            `The value ${errorData.value} is not a valid CPF!`
          );

        if (errorData.path === "email")
          throw new BadRequestError(
            `The value ${errorData.value} is not a valid e-mail address!`
          );

        if (errorData.path === "name")
          throw new BadRequestError(
            `The value ${errorData.value} does not match the name requirements!`
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

      if (data.cpf && data.cpf != student.cpf)
        throw new ConflictError("It's not allowed to alter the student's CPF!");

      return await student.update(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        if (!error.errors || error.errors.length === 0)
          throw new BadRequestError(
            "Please, check if all the fields are filled correctly!"
          );

        const errorData = error.errors.pop();

        if (errorData.path === "email")
          throw new BadRequestError(
            `The value ${errorData.value} is not a valid e-mail address!`
          );

        if (errorData.path === "name")
          throw new BadRequestError(
            `The value ${errorData.value} does not match the name requirements!`
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
