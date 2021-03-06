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

 const existeUsuarioPorCedula=async (cedula = '') => {
    const existeUsuario =  await usuario.findOne({cedula})
     if (!existeUsuario) {
         throw new Error(`no existe un usuario con esta cedula ${id} `)
     }
 }


 const coleccionesPermitidas=(coleccion='',coleccionesPermitidas=[])=>{
    const incluida= coleccionesPermitidas.includes(coleccion)
    if(!incluida){
        throw new  Error(`La coleccion ${coleccion} no es permitidas, ${coleccionesPermitidas}`)
    }

    return true
 }





module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeUsuarioPorCedula,
    coleccionesPermitidas
}