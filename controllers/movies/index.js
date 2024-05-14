const express = require('express');
const router = express.Router();
const moviesMethods = require('./methods');
const authMiddleware = require('../../middlewares/authorization');

router.get('/list/all', (req, res) => {
    res.send("Endpoint para consultar las listas de todos los usuarios");
});

router.use(authMiddleware);

//Endpoint para consultar la lista de peliculas de un usuario
router.get('/list/:id', async (req, res) => {
  try {    
    const movie= await moviesMethods.listMoviesId(req.params);    
    res.status(movie.code).json({
      message: movie.message,
      data: movie.data
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Endpoint para añadir peliculas a una lista
router.post('/list/:id/add', async (req, res) => {   
  try {    
    const movie= await moviesMethods.addMovies(req.body,req.params);  
    res.status(movie.code).json({
      message: movie.message
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Endpoint para eliminar peliculas a una lista
router.delete('/list/:id/delete/:movie_id', async (req, res) => {
  try { 
    const movie= await moviesMethods.deleteMovie(req.params);    
    res.status(movie.code).json({
      message: movie.message
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/list/:id/rate', (req, res) => {
    res.send("Endpoint para calificar listas de otros usuarios");
});

module.exports = router;