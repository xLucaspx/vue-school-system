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
      assert.strictEqual(res.status, expected),
        `Status should be ${expected}. Actual: ${res.status}`;

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
        assert.strictEqual(res.status, expected),
          `Status should be ${expected}. Actual: ${res.status}`;
      }
      {
        const expected = { error: "Missing student name in the query!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected}. Actual: ${actual}`
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
        assert.strictEqual(res.status, expected),
          `Status should be ${expected}. Actual: ${res.status}`;
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
          `Should return ${expected}. Actual: ${actual}`
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
        assert.strictEqual(res.status, expected),
          `Status should be ${expected}. Actual: ${res.status}`;
      }
      {
        const expected = { error: "Student not found!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Should return ${expected}. Actual: ${actual}`
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
        assert.strictEqual(res.status, expected),
          `Status should be ${expected}. Actual: ${res.status}`;
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
          `Should return ${expected}. Actual: ${actual}`
        );
      }
    });
  });
});
