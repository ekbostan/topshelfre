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
  test('should update a book by ID', () => {
    return request(app)
      .put('/books/1')
      .send({ title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99 })
      .expect(200);
  });
});
