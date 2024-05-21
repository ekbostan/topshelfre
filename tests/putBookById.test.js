const request = require('supertest');
const app = require('../NodeJS_');
let server;

beforeAll(() => {
  server = require('../NodeJS_Server');
});

afterAll((done) => {
  server.close(done);
});

describe('PUT /books/:id', () => {
  beforeAll(() => {
    return request(app)
      .post('/books')
      .send({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 })
      .expect(201);
  });

  test('should update a book by ID', () => {
    return request(app)
      .put('/books/1')
      .send({ title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99 })
      .expect(200);
  });
});
