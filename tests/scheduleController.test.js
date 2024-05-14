import request from 'supertest';
import app from '../app';
const { generateToken } = require('../helpers/jwt')

beforeAll(async () => {
    const payload = { id: 1 };
    let token = generateToken(payload)}
);

describe('Schedule Component', () => {
    describe('GET /api/schedule', () => {
      it('should get all schedule', async () => {
        const res = await request(app)
        .get('/api/schedule')
        .set('Cookie', `token=`)
        .send({
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('test@gmail.com');
      });
    });
  
  
    describe('POST /api/login', () => {
      it('should login user', async () => {
        const res = await request(app).post('/api/login').send({
          email: 'test@gmail.com',
          password: 'ABCDAD',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
      });
  
      it('should not login', async () => {
        const res = await request(app).post('/api/login').send({
          email: 'test@gmail.com',
          password: 'ABCD',
        });
        expect(res.statusCode).toBe(401);
      });
    });
})