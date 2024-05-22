const request = require("supertest");
const app = require("../NodeJS_");
let server;

beforeAll(() => {
  server = require("../NodeJS_Server");
});

afterAll((done) => {
  server.close(done);
});


describe('POST /books', () => {
    beforeEach(() => {
      app.resetBooks(); 
    });

  
  test("should create a new book with all fields", () => {
    return request(app)
      .post("/books")
      .send({
        id: 1,
        title: "Book 1",
        author: "Author 1",
        published_date: "2003-12-12",
        price: 9.99,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: 1,
          title: "Book 1",
          author: "Author 1",
          published_date: "2003-12-12",
          price: 9.99,
        });
      });
  });

  // Creating a book with missing fields
  test("should not create a book with missing required fields", () => {
    return request(app)
      .post("/books")
      .send({ id: 2, title: "My Journey", price: 5.0 })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Missing required fields",
        });
      });
  });

 
  test("should not create a book with invalid data types", () => {
    return request(app)
      .post("/books")
      .send({
        id: "book-number",
        title: "The Bluest Eye",
        author: "Dumbledore",
        published_date: "Gandalf",
        price: "This is def not a number",
      })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Invalid data types",
        });
      });
  });

 
  test("should not create a book with duplicate ID", () => {
    // First book
    return request(app)
      .post("/books")
      .send({
        id: 100,
        title: "Alice in Wonderland",
        author: "My Grandma",
        published_date: "2004-08-01",
        price: 12.99,
      })
      .expect(201)
      .then(() => {
        //Creating the scond book with same Id
        return request(app)
          .post("/books")
          .send({
            id: 100,
            title: "Erol in Wonderland",
            author: "Erol",
            published_date: "2006-03-01",
            price: 200.99,
          })
          .expect(409)
          .then((response) => {
            expect(response.body).toEqual({
              message: "Book with this ID already exists",
            });
          });
      });
  });
});
