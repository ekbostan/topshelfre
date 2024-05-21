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
  test('should delete a book by ID', () => {
    return request(app)
      .delete('/books/1')
      .expect(200);
  });
});
