const request = require('supertest');
const sequelize = require('../seq');
const { app, syncDatabase } = require('../app');
const Appointment = require('../models/doctor');

let cookies = ''
beforeAll(async () => {
  await syncDatabase();
  const resp = await request(app).post("/api/login").send({
    email: 'patient3@email.com',
    password: 'patient3',
  });
  cookies = resp.headers['set-cookie']
});
describe('POST /api/appointment', () => {
    it('should create a new appointment', async () => {
        const res = await request(app) 
        .post('/api/appointment')
        .set('Cookie', `token=${cookies}`)
        .send({
            idDokter: 4,
            waktu: '2024-06-05 16:47'
        });
        console.log(res);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('idUser');
        expect(res.body).toHaveProperty('idDokter');
        expect(res.body).toHaveProperty('waktu');
        expect(res.body).toHaveProperty('noUrut');
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body).toHaveProperty('createdAt');
    });
  
    it('should return 400 if required fields are missing', async () => {
        const res = await request(app) 
        .post('/api/appointment')
        .set('Cookie', `token=${cookies}`)
        .send({
            idDokter: 4,
            waktu: '2024-06-05 16:47'
        });
        expect(res.statusCode).toBe(400); 
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Required input not complete');
    });
  
    it('should return 403 if user does not have access', async () => {
      const res = await request(app) 
      .post('/api/appointment')
        .set('Cookie', `token=${cookies}`)
        .send({
            idDokter: 4,
            waktu: '2024-06-05 16:47'
        });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Not Authenticated');
  });
    it('should return 500 if other error occurs', async () => {
      jest.spyOn(Appointment, 'findAll').mockImplementation(() => {
        throw new Error('Internal server error');
      });
      const res = await request(app) 
      .post('/api/appointment')
        .set('Cookie', `token=${cookies}`)
        .send({
            idDokter: 4,
            waktu: '2024-06-05 16:47'
        });
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Internal Server Error');
    });

});
describe('GET /api/appointment/', () => {
  it('should get user appointments', async () => {
    const res = await request(app)
    .get('/api/appointment')
    .set('Cookie', `token=${cookies}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 401 if not not auth', async () => {
    const res = await request(app)
    .get('/api/appointment');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Appointment not found');
  });
  

  it('should return 500 if other error occurs',  async () => {
    jest.spyOn(Appointment, 'findOne').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const res = await request(app)
    .get('/api/appointment')
    .set('Cookie', `token=${cookies}`);
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Internal Server Error');
  });
});  
 
describe('GET /api/appointment/:id', () => {
  it('should get an existing appointment', async () => {
    const res = await request(app)
    .get('/api/appointment/5')
    .set('Cookie', `token=${cookies}`);
    expect(res.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('idUser');
    expect(response.body).toHaveProperty('idDokter');
    expect(response.body).toHaveProperty('waktu');
    expect(response.body).toHaveProperty('noUrut');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('createdAt');
  });

  it('should return 404 if appointment are missing', async () => {
    const res = await request(app)
    .get('/api/appointment/999999')
    .set('Cookie', `token=${cookies}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Appointment not found');
  });
  it('should return 401 if appointment are missing', async () => {
    const res = await request(app)
    .get('/api/appointment/5');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Appointment not found');
  });
  

  it('should return 500 if other error occurs',  async () => {
    jest.spyOn(Appointment, 'findOne').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const res = await request(app)
    .get('/api/appointment/99999999999999')
    .set('Cookie', `token=${cookies}`);
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Internal Server Error');
  });
});  

describe('DELETE /api/appointment/:id', () => {
  it('should delete an existing appointment', async () => {
    const res = await request(app)
    .delete(`/api/appointment/5`)
    .set('Cookie', `token=${cookies}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 404 if appointment are missing', async () => {
    const res = await request(app)
    .delete('/api/appointment/999999')
    .set('Cookie', `token=${cookies}`);;
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe("Appointment with id '999999' is not found");
  
  });

  it('should return 401 if user does not have access', async () => {
    const res = await request(app) 
    .delete(`/api/appointment/10`)
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 500 if other error occurs', async () => {
    jest.spyOn(Appointment, 'destroy').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const res = await request(app)
    .delete('/api/appointment/99999999999999')
    .set('Cookie', `token=${cookies}`);;
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Internal Server Error');
  });
});  

describe('PUT /api/appointment/:id', () => {
  it('should update an existing appointment', async () => {
    const res = await request(app)
    .put(`/api/appointment/10`)
    .set('Cookie', `token=${cookies}`)
    .send({
      waktu: '2024-06-05 17:47'
  });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Appointment updated successfully');
  });

  it('should return 404 if appointment are missing', async () => {
    const res = await request(app)
    .put(`/api/appointment/9999`)
    .set('Cookie', `token=${cookies}`)
    .send({
      waktu: '2024-06-05 17:47',
  });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 403 if user does not have access', async () => {
    const res = await request(app) 
    .put(`/api/appointment/1`)
    .send({
      waktu: '2024-06-05 17:47'
  });
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 500 if other error occurs', async () => {
    jest.spyOn(Appointment, 'findOne').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    const res = await request(app)
    .put(`/api/appointment/99999999999999999`)
    .set('Cookie', `token=${cookies}`)
    .send({
      waktu: '2024-06-05 17:47'
  });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Internal Server Error');
  });
});  

afterAll(async () => {
  await sequelize.close();
});