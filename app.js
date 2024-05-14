require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const accountsControllers = require('./controllers/accounts');
const moviesControllers = require('./controllers/movies');
//const moviesListControllers = require('./controllers/moviesList');

app.use('/accounts', accountsControllers);
app.use('/movies', moviesControllers);
//app.use('/moviesList', moviesListControllers);

app.get("/", async (req,res) =>{
  //const client = await db.connectToMongoDB();
  /*const lista  = await client.db('Backend')
                            .collection('Prueba')
                            .find()
                            .toArray();*/
  res.send('Bienvenidos a nuestro backend');                             
});

module.exports = app;