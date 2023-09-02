import StudentController from "@/controller/StudentController.js";
import { defineStore } from "pinia";

const studentController = new StudentController();

export const useStudentStore = defineStore("student", {
  state: () => {
    // could also be defined as: state: () => ({ students: [] })
    return { students: [] };
  },
  actions: {
    async getStudents(name = "") {
      const students =
        !name || name == ""
          ? await studentController.getStudents()
          : await studentController.getStudentsByName(name);

      this.students = students;
    },

    async createStudent(student) {
      await studentController.createStudent(student);
    },

    async updateStudent(id, student) {
      await studentController.updateStudent(id, student);
    },

    async deleteStudent(id) {
      await studentController.deleteStudent(id);
      this.students = this.students.filter((student) => student.id !== id);
    },
  },
});
