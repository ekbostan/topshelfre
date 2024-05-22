const request = require("supertest");
const app = require("../NodeJS_");
let server;

beforeAll(() => {
  server = require("../NodeJS_Server");
});

afterAll((done) => {
  server.close(done);
});

describe("DELETE /books/:id", () => {
  beforeEach(() => {
    app.resetBooks();
    return request(app)
      .post("/books")
      .send({
        id: 1,
        title: "Book 1",
        author: "Author 1",
        published_date: "2024-08-04",
        price: 10.99,
      })
      .expect(201);
  });

  test("should delete a book by ID", () => {
    return request(app)
      .delete("/books/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ message: "Book deleted successfully" });
        //To check if it is actually deleted
        return request(app).get("/books/1").expect(404);
      });
  });

  test("should return a 404 if a book id does not exist in books", () => {
    return request(app)
      .delete("/books/1000000")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ message: "Book not found" });
      });
  });

  test("should not try to delete a book that is already deleted", () => {
    return request(app)
      .delete("/books/1")
      .expect(200)
      .then(() => {
        return request(app)
          .delete("/books/1")
          .expect(404)
          .then(response => {
            expect(response.body).toEqual({ message: "Book not found" });
          });
      });
  });
});
