const { response } = require("express");
const res = require("express/lib/response")
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");




const validarJWT=async (req,res = response, next)=>{

const token = req.header('x-token')
if(!token ){
    return res.status(401).json({
        msg:"no hay token en la peticion"
    });
}


try {
    const {uid}= jwt.verify(token,process.env.SECRETKEY)
    req.uid=uid

    //leer el usuario que corresponde al uid 
    const usuario=await Usuario.findById(uid)

    if(!usuario ){
        return res.status(401).json({
            msg:"token no valido- usuario no existe "
        })
    }
    // verificar el estado del usuario 

    if(!usuario.estado){
        return res.status(401).json({
            msg:"token no valido- usuario con estado false "
        })

    }
    req.usuario= usuario

    

    next()
} catch (error) {
    //console.log(error)
     return res.status(401).json({
        msg:'Token no valido'
    })
}
next();

}

module.exports ={
    validarJWT
}