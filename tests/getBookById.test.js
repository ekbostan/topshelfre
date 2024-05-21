const request = require('supertest');
const app = require('../NodeJS_');
let server;

beforeAll(() => {
  server = require('../NodeJS_Server');
});

afterAll((done) => {
  server.close(done);
});

describe('GET /books/:id', () => {
  test('should retrieve a book by ID', () => {
    return request(app)
      .get('/books/1')
      .expect(200);
  });
});
