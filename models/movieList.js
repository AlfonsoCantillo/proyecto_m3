const {Schema, model} = require('mongoose');

const movieListSchema = new Schema({  
  name:{
    type: String,    
    required: [true,'Debe ingresar un nombre de la lista de peliculas.']
  },  
  owner:{
    type: String,
    unique: true,
    required: [true,'El nickname del usuario es obligatorio.']
  },
  rating:{
    type: Number,
    default: 5,
    required: [true,'Debe ingresar la calificación de la lista.']
  },
  movies:[
    {
      name: {type: String, required:[true, "Debe ingresar el nombre de la película."]},
      year: {type: Number, required:[true, "Debe ingresar el año de lanzamiento de la pelicula."]},
      image: String
    }
  ]
},
{
  timestamps: {createdAt: 'creationDate', updatedAt: 'lastUpdate'}   
}
);

const movieList = model('MovieList',movieListSchema);

module.exports = movieList;