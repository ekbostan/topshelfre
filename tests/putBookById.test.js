const request = require("supertest");
const app = require("../NodeJS_");
let server;

beforeAll(() => {
  server = require("../NodeJS_Server");
});

afterAll((done) => {
  server.close(done);
});

describe("PUT /books/:id", () => {
  beforeEach(() => {
    app.resetBooks();
    return request(app)
      .post("/books")
      .send({
        id: 100,
        title: "Book 100",
        author: "Author 100",
        published_date: "2004-04-04",
        price: 4.49,
      })
      .expect(201);
  });

  test("should update a book by ID", () => {
    return request(app)
      .put("/books/100")
      .send({
        title: "Updated Book 100",
        author: "Updated Author 100",
        published_date: "2004-04-05",
        price: 14.49,
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: 100,
          title: "Updated Book 100",
          author: "Updated Author 100",
          published_date: "2004-04-05",
          price: 14.49,
        });
      });
  });

  test("should return 400 for id/slug not int", () => {
    return request(app)
      .put("/books/invalid-id")
      .send({
        title: "Book 100",
        author: "Author 100",
        published_date: "2004-04-04",
        price: 4.49,
      })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ message: "Invalid book ID" });
      });
  });

  test("should return 404 for non-existent ID", () => {
    return request(app)
      .put("/books/999")
      .send({
        title: "Non-existent Book",
        author: "Author 1",
        published_date: "2004-04-04",
        price: 4.49,
      })
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ message: "Book not found" });
      });
  });

  test("should return 400 for missing required fields", () => {
    return request(app)
      .put("/books/100")
      .send({ title: "Incomplete Book" }) 
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ message: "Missing required fields" });
      });
  });

  test("should return 400 for invalid data types", () => {
    return request(app)
      .put("/books/100")
      .send({
        title: "Book 1",
        author: "Author 1",
        published_date: "Invalid Date",
        price: "Not a number",
      })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ message: "Invalid data types" });
      });
  });
});
