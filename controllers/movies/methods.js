const MovieList = require('../../models/movieList');

//Método para Adicionar/Agregar películas
const addMovies = async (payload,parameters) =>{
  try {     
    if (!parameters.id) throw Error("Usuario no identificado.");

    if(!payload.movies) throw Error("Lista de películas no identificadas.");
    
    //Validar si el usuario ya tiene creada una lista de pelicula. Solo se admite una lista por usuario.   
    const foundMovieList = await MovieList.findOne({_id: parameters.id});
    if (!foundMovieList){
      const objectMovie = {
        "name": `Lista de películas usuario ${parameters.id}`,
        "owner": parameters.id,
        "rating": 0,
        "movies": payload.movies
      }
      //Crear la lita de peliculas
      const newMovieList = new MovieList(objectMovie);    
      await newMovieList.save();
    }else{
      //Validar si las pelicula seleccionadas se encuentran registradas en la base de datos.
      const validate = await validateMovie(payload.movies,foundMovieList);
      if (!validate.exit) throw Error(validate.message);

      //Adicionar peliculas a la lista de usuario.
      for (let i = 0; i < payload.movies.length; i++){
        await foundMovieList.movies.push(payload.movies[i]);
        await foundMovieList.save();
      }
    }
    
    return {"code": 200, "message": `Película(s) registrada(s) exitosamente, en la lista de usuario ${parameters.id}`};
  } catch (error) {
    console.log(error.message);
    return {"code": 400, "message": error.message};    
  }
};

/*
Método para Eliminar películas de la lista.
*/
const deleteMovie = async(parameters) =>{
  try {
    if (!parameters.id) throw Error("Usuario no identificado.");
    if (!parameters.movie_id) throw Error("Película no identificada.");

    //Buscar la lista de usuario   
    const foundMovieList = await MovieList.findOne({_id: parameters.id});
    if (!foundMovieList) throw Error(`Lista de peliculas del usuario ${parameters.id} no identificada.`);
    
    //Valida si la pelicula se encuentra en la lista de peliculas
    const movies = foundMovieList.movies;
    const foundMovie = movies.findIndex((movies) => movies.id === parameters.movie_id);
    if (foundMovie === -1) throw Error(`Película no identificada.`);    
    //Elimina la pelicula de la lista
    await foundMovieList.movies.splice(foundMovie,1);
    await foundMovieList.save();

    return {"code": 200, "message": "Lista de películas registrada exitosamente.", "data": foundMovieList};
  } catch (error) {
    return {"code": 400, "message": error.message, "data": null};    
  }
};

/*
Método para listar peliculas.
*/
const listMoviesId = async(parameters) =>{
  try {
    //Consultar la lista de un usuario   
    const foundMovieList = await MovieList.findOne({_id: parameters.id});
    if (!foundMovieList) throw Error(`Lista de peliculas del usuario ${parameters.id} no identificada.`);

    return {"code": 200, "message": `Lista de películas del usuario ${parameters.id}.`, "data": foundMovieList.movies};
  } catch (error) {    
    return {"code": 400, "message": error.message, "data": null};    
  }
};

//Funcion para validar si la pelicula seleccionada se encuentra en la lista
function validateMovie(arrMovies,MovieList){
  for (let i = 0; i < arrMovies.length; i++){
    const movieName = arrMovies[i]['name'];
    const array = MovieList.movies;
    const foundMovie = array.filter((array)=> {
      return array.name === movieName;
    });
    if (foundMovie.length > 0) return {"exit": false,"message":`La pelicula ${movieName} ya se encuentra en su lista de preferencias.`};
  }
  return {"exit": true,"message": null};
}

module.exports = {addMovies,deleteMovie,listMoviesId};