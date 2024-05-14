const request = require("supertest");
const mongoose = require("mongoose");

const {goodNewUser,badNewUser,userTest} = require('./testData');
const app = require('../app');

beforeAll(async ()=>{
  await mongoose.connect(process.env.DB_URL);
},10000);

afterAll(async ()=>{
  await mongoose.connection.close();
},10000);

describe('Pruebas unitarias controlador Accounts.',()=>{
  /*describe('Pruebas EndPoint Register',()=>{
    test('Prueba de registro, petición sin datos', async () => {
      const response = await request(app).
                             post('/accounts/register').
                             send();
      expect(response.statusCode).toBe(400);
    }); 

    test('Prueba de registro, peticion datos faltantes', async () => {
      const response = await request(app)
                            .post('/accounts/register')
                            .send(badNewUser);
      expect(response.statusCode).toBe(400);
    });       
  });*/

  describe('Pruebas EndPoint Login',()=>{
    test('Prueba de Login, petición usuario', async () => {
      const response = await request(app)
                            .post('/accounts/login')
                            .send(userTest);
      expect(response.statusCode).toBe(200);
        
    });
  });
});



