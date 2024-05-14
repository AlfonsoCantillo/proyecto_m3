const {Schema, model} = require("mongoose");

const movieNewSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required:[true,"Debe digitar el nombre de la película."]
    },
    year: {
      type: Number,
      required: [true,"Debe digitar el año de lanzamiento de la película."]
    },
    image: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updateAt: 'lastUpdate'
    }
  }
);

const movies = model('movies',movieNewSchema);

module.exports = movies;