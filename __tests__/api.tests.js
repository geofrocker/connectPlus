const request = require('supertest');
const app = require('../api/api');
const mongoose = require('mongoose');
const config = require('../config/');

describe('Test the root path', () => {
  let token = null;
  beforeEach((done) => {
    request(app)
      .post('/public/auth/register')
      .send({ username: 'Geofreytest2', password: '12345bvbb', email: 'geom@gmail.com' })
      .then(() => {
        done();
      });
    request(app)
      .post('/public/auth/login')
      .send({ username: 'Geofreytest2', password: '12345bvbb' })
      .then((res) => {
        console.log(res.body.token);
        token = res.body.token;
        done();
      });
  });
  afterAll(() => mongoose.connection.db.dropDatabase());

  test('It should response the POST method', (done) => {
    request(app).post('/private/category')
      .send({ name: 'tobi', description: 'jfjf' })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
