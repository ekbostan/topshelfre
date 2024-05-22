const request = require("supertest");
const app = require("../NodeJS_");
let server;

beforeAll(() => {
  server = require("../NodeJS_Server");
});

afterAll((done) => {
  server.close(done);
});

describe("GET /books/:id", () => {
  beforeEach(() => {
    app.resetBooks();
    return request(app)
      .post("/books")
      .send({
        id: 2,
        title: "TTEEEST",
        author: "TEEEST",
        published_date: "2000-04-03",
        price: 10000,
      })
      .expect(201);
  });

  test("should retrieve a book by ID", () => {
    return request(app)
      .get("/books/2")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: 2,
          title: "TTEEEST",
          author: "TEEEST",
          published_date: "2000-04-03",
          price: 10000,
        });
      });
  });

  test("should not retrieve a book with non-existing ID", () => {
    return request(app)
      .get("/books/33333")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ message: "Book not found" });
      });
  });

  test("should return 400 for id/slug not int", () => {
    return request(app)
      .get("/books/weqeqweqwe")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ message: "Invalid book ID" });
      });
  });
});
