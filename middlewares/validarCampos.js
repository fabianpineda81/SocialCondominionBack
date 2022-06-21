const { validationResult } = require("express-validator")

const validarCampos=(req,res,next)=>{
  console.log(req.body)
    const erros= validationResult(req)
    console.log("hay errores?",erros)
    if(!erros.isEmpty()){
      console.log(erros)
      return res.status(400).json(erros)
    }
  
    next();
}

module.exports={
    validarCampos
}