const request = require('supertest');
const sequelize = require('../seq');
const { app, syncDatabase } = require('../app');
const Schedule = require('../models/schedule');

beforeAll(async () => {
  await syncDatabase();
});
describe('GET /api/schedule', () => {
  it('should get all schedule', async () => {
    const res = await request(app)
    .get('/api/schedule')
    .send({
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
  it('should return 500 if there is an internal server error', async () => {
    jest.spyOn(Schedule, 'findAll').mockImplementation(() => {
        throw new Error('Internal server error');
    });
    const res = await request(app)
    .get('/api/schedule')
    .send({
    });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});
describe('GET /api/schedule/:id', () => {
  it('should get schedule of doctor with id 1', async () => {
    const res = await request(app)
    .get('/api/schedule/1')
    .send({
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
  it('should return 404 if there is an internal server error', async () => {
    const res = await request(app)
    .get('/api/schedule/999999')
    .send({
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Schedule of doctor with id '999999' is not found")
  });
  it('should return 500 if there is an internal server error', async () => {
    jest.spyOn(Schedule, 'findAll').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const res = await request(app)
    .get('/api/schedule/90')
    .send({
    });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});

afterAll(async () => {
  await sequelize.close();
});
