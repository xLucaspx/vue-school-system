const { Op } = require("sequelize");
const { BadRequestError } = require("../errors");
const StudentServices = require("../services/StudentServices");

const studentServices = new StudentServices();

class StudentController {
  static async getStudents(req, res) {
    try {
      const students = await studentServices.getStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async getStudentById(req, res) {
    const { id } = req.params;

    try {
      const student = await studentServices.getOneStudent({ id });
      return res.status(200).json(student);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async filterStudentsByName(req, res) {
    const { name } = req.query;

    try {
      if (!name)
        throw new BadRequestError("Missing student name in the query!");

      const students = await studentServices.getStudents({
        name: { [Op.like]: `%${name}%` },
      });
      
      return res.status(200).json(students);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  // static async createStudent(req, res) {}

  // static async updateStudent(req, res) {}

  // static async deleteStudent(req, res) {}
}

module.exports = StudentController;
