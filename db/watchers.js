//const mongoDBClient = require('./client');
const {connection} = require('mongoose');

const gracefulShutdown = async () =>{
  console.log('Cerrando conexión a MongoDB...');
  await connection.close();
  //mongoDBClient.close();
  console.log('Conexión a MongoDB cerrada.');
};

const setUpMongoDBProcessWatchers = () =>{
  process.on('exit', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGKILL', gracefulShutdown);
  process.on('uncaughtException', gracefulShutdown);
};

module.exports = {gracefulShutdown,setUpMongoDBProcessWatchers};