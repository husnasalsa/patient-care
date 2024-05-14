import request from 'supertest';
import app from '../app';

describe('User Component', () => {
    let user1;
  
    describe('POST /api/register', () => {
      it('should add one user to db', async () => {
        const res = await request(app).post('/api/register').send({
            username: 'Test1', 
            email: 'test@gmail.com', 
            password: 'ABCDAD', 
            phoneNumber: 3245678754
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('test@gmail.com');
        user1 = res.body;
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