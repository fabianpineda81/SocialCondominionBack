const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");

const login= async(req,res=response)=>{
        const {correo, password}= req.body

        try{
            // verificar si el correo existe 
            const usuario = await Usuario.findOne({correo})
            if(!usuario){
                return res.status(400).json({
                    msg:"usuario / password no son correctos -email"
                })
            }

            // si el usuario esta activo 
            if(!usuario.estado){
                return res.status(400).json({
                    msg:"usuario / password no son correctos -estado false"
                })
            }

            // vifircar la contraseña 
            const validPassword= bcryptjs.compareSync(password,usuario.password)
            if(!validPassword){
                return res.status(400).json({
                    msg:"usuario / password no son correctos -contraseña"
                })
            }

            // general el jwt
            const token = await generarJWT(usuario.id);
            


            res.json({
                usuario,
                token
            })



        }catch(error){
            console.log(error)
            return res.status(500).json({
                msg:"hable con el administrador "
            })

        }

       
}

module.exports={
    login
}