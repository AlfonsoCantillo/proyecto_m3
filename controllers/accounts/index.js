 const express = require ("express");
 const router = express.Router();
 const accountsMethods = require("./methods");

 router.post('/register',async (req, res) =>{
  try {    
    const user= await accountsMethods.registerUser(req.body);    
    res.status(user.code).json({
      message: user.message,
      data: user.data
    });
  } catch (error) {
    res.status(400).json(error);
  }
 });

 router.post('/login',async (req,  res)=>{
  //Obtener del cuerpo de la petición el nombre de usuario y la pasword
  const {user, password} = req.body;
  try {
    const accessToken = await accountsMethods.loginUser(user,password);    
    if (!accessToken) throw new Error('Token invalido.');
    //console.log(accessToken);
    res.status(200).json(accessToken);
  } catch (error) {
    console.log(error);
    res.status(400).send('Nombre de usuario o contraseña incorrecta.');
  }
 });

module.exports = router;