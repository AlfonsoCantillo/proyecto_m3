
const request = require("supertest");
const mongoose = require("mongoose");

const {movieListTest} = require('./testData');
const app = require('../app');

beforeAll(async ()=>{
  await mongoose.connect(process.env.DB_URL);
},20000);

afterAll(async ()=>{
  await mongoose.connection.close();
},20000);

describe('Pruebas unitarias controlador MoviesList.',()=>{
  test('Prueba crear lista de peliculas', async()=>{
    const response = await request(app).
                             get('/movies/list/66401b7c3267e9be4f930ced').
                             send();
    expect(response.statusCode).toBe(200);
  });
});