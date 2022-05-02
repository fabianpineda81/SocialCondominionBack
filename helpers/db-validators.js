const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la bd`)
    }
}

const emailExiste = async (correo = '') => {
    console.log(correo)
   const emailExis =  await usuario.findOne({correo})
   console.log(emailExis,correo)
    if (emailExis) {
        throw new Error(`El email ${correo} ya esta registrado en la bd`)
    }
}


const existeUsuarioPorId=async (id = '') => {
    const existeUsuario =  await usuario.findById(id)
     if (!existeUsuario) {
         throw new Error(`no existe un usuario con este id   ${id} `)
     }
 }





module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}