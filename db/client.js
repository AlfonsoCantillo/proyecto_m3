//const MongoClient = require("mongodb").MongoClient;
const {connect, connection} = require("mongoose");
const mongoWatchers = require('./watchers');

connectToMongoDB = async () =>{
  const connectionString = process.env.DB_URL;
  try {
    console.log("Conectandose a MongoDB...");
    await connect(connectionString,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB establecida.");
    connection.on('error',console.error.bind(console, 'Error de conexión.'));
    connection.once('open', ()=> console.log("Conectado a MongoDB"));
  } catch (error) {
    console.log("Error conectandose a MongoDB...");
    console.log(error);
  } finally{
    mongoWatchers.setUpMongoDBProcessWatchers();
  }
  return null;
};

const closeMongoDB = mongoWatchers.gracefulShutdown;

module.exports = {connectToMongoDB,closeMongoDB};


/*connectToMongoDB = async () =>{
  const connectionString = process.env.DB_URL;
  const mongoDBClient = new MongoClient(connectionString);
  try {
    console.log("Conectandose a MongoDB...");
    await mongoDBClient.connect();
    console.log("Conexión a MongoDB establecida.");
    return mongoDBClient;
  } catch (error) {
    console.log("Error conectandose a MongoDB...");
    console.log(error);
  }finally{
    mongoWatchers.setUpMongoDBProcessWatchers();
  }

  return null;
};*/

//const closeMongoDB = mongoWatchers.gracefulShutdown;

//module.exports = {connectToMongoDB,closeMongoDB};