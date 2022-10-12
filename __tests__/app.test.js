const app = require('../app.js');
const request = require('supertest');
const db = require('../db/');

afterAll(() => {
  return db.end();
});

describe('GET /api/drinks/:id', () => {
  test('respond with 200 status code', () => {
    return request(app).get('/api/drinks/1').expect(200);
  });
  test('responds with requested object with expected properties', () => {
    return request(app)
      .get('/api/drinks/1')
      .then(({ body }) => {
        expect(body.drink).toEqual({
          drink_id: 1,
          drink_name: 'Vimto',
          drink_description: "Manchester's finest",
        });
      });
  });
  test('400 bad request if id is invalid', () => {
    return request(app)
      .get('/api/drinks/notAnId')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('SQL says no');
      });
  });
  test('404 not found if id is valid but does not exist', () => {
    return request(app)
      .get('/api/drinks/10000')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('404 not found')
      });
  });
});

describe('POST /api/snacks', () => {
  test('respond with 201 status code with new snack object returned', () => {
    const newSnack = {
      snack_name: 'Bounty',
      snack_description: 'Hated by many, loved by few',
    };

    return request(app)
      .post('/api/snacks')
      .send(newSnack)
      .expect(201)
      .then(({ body }) => {
        expect(body.snack).toEqual({
          snack_id: 7,
          snack_name: 'Bounty',
          snack_description: 'Hated by many, loved by few',
        });
      });
  });
});
