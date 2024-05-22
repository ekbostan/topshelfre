const request = require('supertest');
const app = require('../NodeJS_');
let server;

beforeAll(() => {
  server = require('../NodeJS_Server');
});

afterAll((done) => {
  server.close(done);
});

describe("GET /books", () => {
  beforeEach(() => {
    app.resetBooks(); 
  });

  test("should retrieve an empty array when there are no books", () => {
    return request(app)
      .get("/books")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });

 
  test("should retrieve all books when there are multiple books", () => {
    app.setBooks([
      {
        id: 1,
        title: "Annabelle 1",
        author: "JK Rowling",
        published_date: "2001-07-31",
        price: 200,
      },
      {
        id: 2,
        title: "Annabelle 2",
        author: "JK Rowling",
        published_date: "2002-07-31",
        price: 100,
      }
    ]);

    return request(app)
      .get("/books")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([
          {
            id: 1,
            title: "Annabelle 1",
            author: "JK Rowling",
            published_date: "2001-07-31",
            price: 200,
          },
          {
            id: 2,
            title: "Annabelle 2",
            author: "JK Rowling",
            published_date: "2002-07-31",
            price: 100,
          },
        ]);
      });
  });


  test("should have the correct response structure", () => {
    app.setBooks([{
      id: 10,
      title: "Greatest Tale",
      author: "Mervan Asmar",
      published_date: "1000-04-06",
      price: 50,
    }]);

    return request(app)
      .get("/books")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("title");
        expect(response.body[0]).toHaveProperty("author");
        expect(response.body[0]).toHaveProperty("published_date");
        expect(response.body[0]).toHaveProperty("price");
      });
  });
});
