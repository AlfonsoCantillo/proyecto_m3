//Requerir el modulo jsonwebtoken
const jwt = require("jsonwebtoken");
const User = require('../../models/user');

//Crear funcion asincrona, que recibe los parametros user y rol
const createToken = async (user,role)=>{
  //Crear un objeto, con la carga de los datos que recibe la función
  const tokenPayLoad={
    "username":user,
    "role": role
  }
  /*Llamar al método sign del modulo jsonwebtoken que recibe como parametros:
  - La carga de los datos
  - La llave secreta
  - Tiempo de vida del token
  */
  const token = await jwt.sign(
    tokenPayLoad,
    process.env.JWT_SECRET_KEY,
    {expiresIn: process.env.JWT_TTL}
  );

  return token;
};

const registerUser = async (payload) =>{
  try {
    const newUser = new User(payload);    
    await newUser.save();
    return {"code": 200, "message": "Usuario registrado exitosamente.", "data": newUser};
  } catch (error) {
    return {"code": 400, "message": error.message, "data": null};    
  }
};

const loginUser = async (username,password) =>{
  try {
    const user = await User.findOne({nickname: username});    
    if (!user) throw new Error('Usuario no encontrado');
    
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new Error('Contraseña invalida.');

    return await createToken(username,"normal");
  } catch (error) {    
    return null;
  }
  
};

module.exports = {createToken,registerUser,loginUser}