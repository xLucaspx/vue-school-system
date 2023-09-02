const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const app = require("../../server");

describe("School System API E2E Test Suite - Students", () => {
  let BASE_URL = "";
  let _server = {};

  before(async () => {
    if (process.env.NODE_ENV !== "test")
      throw new Error(
        `Tests should run in the test environment!
        \nCurrent environment: ${process.env.NODE_ENV || "development"}`
      );

    _server = app.listen();
    await new Promise((resolve, reject) => {
      _server.once("listening", () => {
        const { port } = _server.address();
        BASE_URL = `http://localhost:${port}`;
        console.log(`Test server running on ${BASE_URL}`);
        resolve();
      });
    });
  });

  after((done) => _server.close(done));

  describe("GET /students", () => {
    it("should return 200 (OK) and the students list", async () => {
      const res = await fetch(`${BASE_URL}/students`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status should be ${expected}. Actual: ${res.status}`
      );

      const list = await res.json();
      assert.ok(list, "Should return the list of students");
    });
  });

  describe("GET /students/search?", () => {
    it("should return 400 (bad request) without name in query", async () => {
      const res = await fetch(`${BASE_URL}/students/search`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = { error: "Missing student name in the query!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 200 (OK) and the students whose name match the name in the query", async () => {
      const res = await fetch(`${BASE_URL}/students/search?name=souza`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 200;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = [
          {
            id: 1,
            name: "Paula Souza",
            cpf: "09172834579",
            email: "paula@email.com",
          },
          {
            id: 4,
            name: "Maurício Souza",
            cpf: "82536271811",
            email: "mdsproducoescontato@email.com",
          },
        ];
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });
  });

  describe("GET /students/:id", () => {
    it("should return 404 (not found) with an id that's not registered", async () => {
      const res = await fetch(`${BASE_URL}/students/555`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 404;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = { error: "Student not found!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 200 (OK) and the student of the corresponding id", async () => {
      const res = await fetch(`${BASE_URL}/students/5`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 200;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          id: 5,
          name: "Guilherme Dias",
          cpf: "03647912255",
          email: "gui98dias@email.com",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });
  });

  describe("POST /students", () => {
    it("should return 400 (bad request) with an invalid student", async () => {
      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = { error: "The value null is not a valid CPF!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 400 (bad request) with an invalid cpf", async () => {
      const student = {
        id: 16,
        name: "test student",
        email: "student@email.com",
        cpf: "0000.0000.00",
      };

      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: `The value ${student.cpf} is not a valid CPF!`,
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 400 (bad request) with an invalid e-mail", async () => {
      const student = {
        id: 16,
        name: "test student",
        email: "student@email",
        cpf: "01928364713",
      };

      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: `The value ${student.email} is not a valid e-mail address!`,
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 400 (bad request) with an invalid name", async () => {
      const student = {
        id: 16,
        name: null,
        email: "student@email.com",
        cpf: "01928364713",
      };

      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: `The value ${student.name} does not match the name requirements!`,
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 409 (conflict) with an id that's already registered", async () => {
      const student = {
        id: 1,
        name: "test student",
        email: "student@email.com",
        cpf: "01928364713",
      };

      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 409;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = { error: "The ID 1 is already registered!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 409 (conflict) with an cpf that's already registered", async () => {
      const student = {
        id: 16,
        name: "test student",
        email: "student@email.com",
        cpf: "09172834579",
      };

      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 409;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: "The CPF 09172834579 is already registered!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 201 (created) and the registered student", async () => {
      const student = {
        id: 16,
        name: "test student",
        email: "student@email.com",
        cpf: "01928364713",
      };

      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const expected = 201;
      assert.strictEqual(
        res.status,
        expected,
        `Status should be ${expected}. Actual: ${res.status}`
      );

      const actual = await res.json();
      assert.ok(actual, "Should return the registered student");
    });
  });

  describe("PUT /students/:id", () => {
    it("should return 400 (bad request) with an invalid e-mail", async () => {
      const student = { email: "student@email" };

      const res = await fetch(`${BASE_URL}/students/16`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: `The value ${student.email} is not a valid e-mail address!`,
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 400 (bad request) with an invalid name", async () => {
      const student = { name: null };

      const res = await fetch(`${BASE_URL}/students/16`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: `The value null does not match the name requirements!`,
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 409 (conflict) when trying to change the student's id", async () => {
      const student = { id: 17 };

      const res = await fetch(`${BASE_URL}/students/16`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 409;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: "It's not allowed to alter the student's ID!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 409 (conflict) when trying to change the student's cpf", async () => {
      const student = { cpf: "61527783952" };

      const res = await fetch(`${BASE_URL}/students/16`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      {
        const expected = 409;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = {
          error: "It's not allowed to alter the student's CPF!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 200 (OK) and the altered student", async () => {
      const student = {
        id: 16,
        name: "altered test student",
        email: "student@newmail.com",
        cpf: "01928364713",
      };

      const res = await fetch(`${BASE_URL}/students/16`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status should be ${expected}. Actual: ${res.status}`
      );

      const actual = await res.json();
      assert.ok(actual, "Should return the altered student");
    });
  });

  describe("DELETE /students/:id", () => {
    it("should return 404 (not found) when trying to delete a student that doesn't exist", async () => {
      const res = await fetch(`${BASE_URL}/students/175`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 404;
        assert.strictEqual(
          res.status,
          expected,
          `Status should be ${expected}. Actual: ${res.status}`
        );
      }
      {
        const expected = { error: "Student not found!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected.error}. Actual: ${actual.error}`
        );
      }
    });

    it("should return 204 (no content) when deleting a student", async () => {
      const res = await fetch(`${BASE_URL}/students/16`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 204;
      assert.strictEqual(
        res.status,
        expected,
        `Status should be ${expected}. Actual: ${res.status}`
      );
    });
  });
});
