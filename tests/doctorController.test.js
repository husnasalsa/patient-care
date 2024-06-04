const request = require('supertest');
const sequelize = require('../seq');
const { app, syncDatabase } = require('../app');
const Doctor = require('../models/doctor');

beforeAll(async () => {
    await syncDatabase();
});

describe('GET /api/doctor', () => {
    it('should fetch all doctor', async () => {
        const res = await request(app)
            .get('/api/doctor')
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
    });

    it('should return 500 if there is an internal server error', async () => {
        jest.spyOn(Doctor, 'findAll').mockImplementation(() => {
            throw new Error('Internal server error');
        });
        const res = await request(app)
            .get('/api/doctor')
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Internal server error');
    });
});

describe('GET /api/doctor/:id', () => {
    it('should fetch a doctor by ID', async () => {
        const res = await request(app)
            .get('/api/doctor/1')
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
    });

    it('should return 404 if doctor is not found', async () => {
        const res = await request(app)
            .get('/api/doctor/9999')
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe("Data with id '9999' is not found");
    });

    it('should return 500 if there is an internal server error', async () => {
        jest.spyOn(Doctor, 'findByPk').mockImplementation(() => {
            throw new Error('Internal server error');
        });
        const res = await request(app)
            .get('/api/doctor/1')
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Internal server error');
    });
});
describe('GET /api/doctor-filter', () => {
  it('should get all doctor with filter schedule day', async () => {
    const res = await request(app)
    .get('/api/doctor-filter')
    .send({
      day: 'Senin'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
it('should return 500 if there is an internal server error', async () => {
    jest.spyOn(Doctor, 'findAll').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const res = await request(app)
    .get('/api/doctor-filter')
    .send({
      day: 'Senin'
    });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
  it('should return 400 if day not defined', async () => {
    const res = await request(app)
    .get('/api/doctor/schedule-filter')
    .send({
      day: 'Monday'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid day name');
  });
});
afterAll(async () => {
    await sequelize.close();
});