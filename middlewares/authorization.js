/*
Objetivo del middleware, es validar si un usuario tiene o no permisos, 
para ejecutar un recurso
*/

const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  //Buscamos el encabezado de autorización
  const {authorization} = req.headers;

  //Verificar si el encabezado autorización existe
  if (!authorization){
    res.status(400).send("No tiene permisos para usar este recurso");
  }else{
    try {
      //extraemos el token
      const token = authorization.split(' ')[1];
      req.jwt_payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
      next();
    } catch (err) {
      //Si ocurre un error es porque el token es invalido
      console.log(err);
      res.status(401).send("No tiene permisos para usar este recurso.");
    }
  }
}

module.exports = authGuard;