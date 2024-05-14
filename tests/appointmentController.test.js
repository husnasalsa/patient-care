const request = require('supertest');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize')

let authToken;

beforeAll(async () => {
    const payload = { id: 1 };
    authToken = jwt.sign(payload, process.env.JWT_SECRET);
});

describe('POST /api/appointments', () => {
    it('should create a new appointment', async () => {
        const response = await request(app) 
        .post('/api/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
            userId: 1,
            doctorId: 1,
            time: '2025-04-28T12:00:00',
            description: 'Regular checkup'
        });
        console.log(response);

        newid = response._body.newAppointment.id
        console.log(newid);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('newAppointment');
        expect(response.body.newAppointment).toHaveProperty('id');
        expect(response.body.newAppointment.userId).toBe(1); 
    });
  
    it('should return 400 if required fields are missing', async () => {
        const response = await request(app) 
        .post('/api/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
            doctorId: 1,
            time: '2025-04-28T12:00:00',
            description: 'Regular checkup'
        });
        expect(response.statusCode).toBe(400); 
        expect(response.body).toHaveProperty('error');
    });
  
    it('should return 403 if user does not have access', async () => {
      const response = await request(app) 
      .post('/api/appointments')
      .set('Authorization', `Bearer `)
      .send({
          userId: 1,
          doctorId: 1,
          time: '2025-04-28T12:00:00',
          description: 'Regular checkup'
      });
      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty('error');
  });
    it('should return 500 if other error occurs', async () => {
      const response = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          userId: 100000,
          doctorId: 1,
          time: '2025-04-28T12:00:00',
          description: 'Regular checkup'
        });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Internal Server Error');
    });

});
 
describe('GET /api/appointments/:id', () => {
  it('should get an existing appointment', async () => {
    const response = await request(app)
    .get('/api/appointments/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('appointment');
    expect(response.body.appointment).toHaveProperty('id');
    expect(response.body.appointment.id).toBe(1); 
  });

  it('should return 404 if appointment are missing', async () => {
    const response = await request(app)
    .get('/api/appointments/999999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Appointment not found');
  });

  it('should return 500 if other error occurs',  async () => {
    const response = await request(app)
    .get('/api/appointments/99999999999999');
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal Server Error');
  });

});  

describe('DELETE /api/appointments/:id', () => {
  it('should delete an existing appointment', async () => {
    const response = await request(app)
    .delete(`/api/appointments/${newid}`)
    .set('Authorization', `Bearer ${authToken}`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Appointment deleted successfully');
  });

  it('should return 404 if appointment are missing', async () => {
    const response = await request(app)
    .delete('/api/appointments/999999')
    .set('Authorization', `Bearer ${authToken}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Appointment not found');
  
  });

  it('should return 403 if user does not have access', async () => {
    const response = await request(app) 
    .delete(`/api/appointments/2`)
    .set('Authorization', `Bearer `)
    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 500 if other error occurs', async () => {
    const response = await request(app)
    .delete('/api/appointments/99999999999999')
    .set('Authorization', `Bearer ${authToken}`);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal Server Error');
  });
});  

describe('PATCH /api/appointments/:id', () => {
  it('should update an existing appointment', async () => {
    const response = await request(app)
    .patch(`/api/appointments/1`)
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      doctorId: 3,
      time: '2024-12-12T12:00:00',
      description: 'Edit Checkup'
  });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Appointment updated successfully');
  });

  it('should return 404 if appointment are missing', async () => {
    const response = await request(app)
    .patch(`/api/appointments/9999`)
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      doctorId: 5,
      time: '2029-12-12T12:00:00',
      description: 'Edit Checkup'
  });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Appointment not found');
  
  });

  it('should return 403 if user does not have access', async () => {
    const response = await request(app) 
    .patch(`/api/appointments/1`)
    .set('Authorization', `Bearer `)
    .send({
      doctorId: 3,
      time: '2024-12-12T12:00:00',
      description: 'Edit Checkup'
  });
    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 500 if other error occurs', async () => {
    const response = await request(app)
    .patch(`/api/appointments/99999999999999999`)
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      doctorId: 3,
      time: '2024-12-12T12:00:00',
      description: 'Edit Checkup'
  });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal Server Error');
  });
});  

afterAll(async () => {
  await sequelize.close();
});