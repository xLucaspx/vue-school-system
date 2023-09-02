class StudentController {
  url = "http://localhost:3000/students";

  async getStudents() {
    try {
      const res = await fetch(this.url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      throw Error;
    }
  }

  async getStudentById(id) {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      throw Error;
    }
  }

  async getStudentsByName(name) {
    try {
      const res = await fetch(`${this.url}/search?name=${name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      throw Error;
    }
  }

  async createStudent(student) {
    try {
      const res = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      throw Error;
    }
  }

  async updateStudent(id, student) {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      throw Error;
    }
  }

  async deleteStudent(id) {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) return;

      const data = await res.json();
      throw new Error(data.error);
    } catch (error) {
      throw Error;
    }
  }
}

export default StudentController;
