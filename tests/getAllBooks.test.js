const request = require('supertest');
const app = require('../NodeJS_');
let server;

beforeAll(() => {
  server = require('../NodeJS_Server');
});

afterAll((done) => {
  server.close(done);
});

describe('GET /books', () => {
  test('should retrieve all books', () => {
    return request(app)
      .get('/books')
      .expect(200);
  });
});
