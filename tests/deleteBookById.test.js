const request = require('supertest');
const app = require('../NodeJS_');
let server;

beforeAll(() => {
  server = require('../NodeJS_Server');
});

afterAll((done) => {
  server.close(done);
});

describe('DELETE /books/:id', () => {
  beforeAll(() => {
    return request(app)
      .post('/books')
      .send({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 })
      .expect(201);
  });

  test('should delete a book by ID', () => {
    return request(app)
      .delete('/books/1')
      .expect(200);
  });
});
