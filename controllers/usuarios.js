const {response}=require('express')
const Usuario = require('../models/usuario')
const bcryptjs= require('bcryptjs')
const { validationResult } = require('express-validator')


const usuariosGet=async(req, res=response) =>{
  const {limite=5,desde=0}= req.query
  const {cedula}= req.params 
  const query= {estado:true}
  

 console.log("cedula",cedula)
 if(cedula){
  const queryCedula={cedula:cedula}
  const usuario = await Usuario.findOne(queryCedula)
  if(usuario){
    res.json(usuario)
  }else{
    res.status(404).json({
      msg:"no se encontro el inquilino con esa cedula"
    })
  }

  return
  
 }


 
   const [total, usuarios]= await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite)
   ])

    res.json({
      total,
      usuarios
    })
  }

  const usuariosPost= async(req, res=response)=>{

   

    const {nombre,correo, password, rol,apto,cedula,numero}= req.body
    const usuario= new Usuario({nombre,correo,password,rol,apto,cedula,numero});
    // verificar si el correo existe 
   

    // encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password,salt);
    // guardar en base de datos 
    await usuario.save();
  
      res.json({
          usuario
      })
  }

  const usuariosPut=async(req, res=response) =>{

    const {id}= req.params  

    const {_id,password ,google,correo,...resto}= req.body
    //
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password= bcryptjs.hashSync(password,salt);
    }
    const usuario= await Usuario.findByIdAndUpdate(id,resto);

       res.json(usuario)
  }

  const usuariosDelete=async (req, res=response) =>{
    const {id}= req.params
    const usuarioAutenticado= req.usuario
    

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    

   return res.json({usuario,usuarioAutenticado})
  }

  module.exports={
      usuariosGet,
      usuariosDelete,
      usuariosPost,
      usuariosPut
  }
