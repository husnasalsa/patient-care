const request = require('supertest');
const { verifyToken } = require('../helpers/jwt')
const sequelize = require('../seq');
const { app, syncDatabase } = require('../app');
const User = require('../models/user'); 

const testUserEmails = []; 
beforeAll(async () => {
    await syncDatabase()
});

const email = `test@gmail.com`;
testUserEmails.push(email);
describe('POST /api/register', () => {
  it('should register user', async () => {
    const res = await request(app).post('/api/register').send({
        username: 'Test0', 
        email: email, 
        password: 'ABCDAD', 
        phoneNumber: 3245678754
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe('Test1');
    expect(res.body.email).toBe('test@gmail.com');
    expect(res.body.password).toBe('ABCDAD');
    expect(res.body.phoneNumber).toBe('3245678754');
  });
  it('should return 400 if one of the field missing', async () => {
    const res = await request(app).post('/api/register').send({
        username: 'Test1', 
        email: '', 
        password: 'ABCDAD', 
        phoneNumber: 3245678754
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Required input not complete');
  });
  it('should return 400 if email not unique', async () => {
    const res = await request(app).post('/api/register').send({
        username: 'Test2', 
        email: email, 
        password: 'ABCDAD', 
        phoneNumber: 3245678754
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Email already exists');
  });
  it('should return 400 if password not between 5-20 character', async () => {
    const res = await request(app).post('/api/register').send({
        username: 'Test3', 
        email: 'test3@gmail.com', 
        password: 'ABCDAD', 
        phoneNumber: 3245678754
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Password must be between 5 to 20 character long.');
  });
  it('should return 500 if there is an internal server error', async () => {
    jest.spyOn(User, 'create').mockImplementation(() => {
        throw new Error('Internal server error');
    });
    const email = `error@example.com`;
    testUserEmails.push(email);
    const response = await request(app)
        .post('/api/register')
        .send({
            username: `erroruser`,
            email: email,
            password: 'password123',
            phoneNumber: '1234567890',
        });
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal server error');
  });
});
describe('POST /api/login', () => {
  it('should login valid user', async () => {
    const res = await request(app).post('/api/login').send({
      email: email,
      password: 'ABCDAD',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('id');
    expect(verifyToken(res.body.token)).toHaveProperty('id');
    expect(verifyToken(res.body.token)).toHaveProperty('email');
    expect(verifyToken(res.body.token)).toHaveProperty('username');
  });
  it('should not login user with email with wrong password', async () => {
    const res = await request(app).post('/api/login').send({
      email: email,
      password: 'ABCD',
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Email and username doesn't match");
  });
  it('should not login user with email that is not found', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'notfoundtest@gmail.com',
      password: 'ABCDAD',
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('User with e-mail "notfoundtest@gmail.com" not found');
  });
  it('should return 500 if there is an internal server error', async () => {
    jest.spyOn(User, 'findOne').mockImplementation(() => {
        throw new Error('Internal server error');
    });
    const res = await request(app).post('/api/login').send({
      email: 'error@gmail.com',
      password: 'ABCDAD',
    });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
  it('should return 400 if there is an empty field', async () => {
    const res = await request(app).post('/api/login').send({
      email: '',
      password: 'ABCDAD',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Required input not complete');
  });
});

afterAll(async () => {
  console.log(testUserEmails);
  await User.destroy({ where: { email: testUserEmails } });
  await sequelize.close();
});