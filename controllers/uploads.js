
const { response } = require("express");
const path= require('path')
const { subirArchivo } = require('../helpers/subir-archivos');
const Productos = require("../models/productos");
const Usuario = require("../models/usuario");
const fs= require('fs')
 




const cargarArchivo=async (req,res=response)=>{
    
    if (!req.files || Object.keys(req.files).length === 0|| !req.files.archivo) {
      res.status(400).send({msg: 'no hay archivos en la peticions'});
      return;
    }
        try{
          const pathCompleto = await subirArchivo(req.files)

    res.json({
      nombre:pathCompleto
    })
      }catch(msg){
        res.status(400).json({msg})
      }
    

    
  
     // eslint-disable-line
  
   
}


const actualizarImagen=async(req,res=response)=>{
    const {id,coleccion}= req.params
    //TODO PASAR ESTO A UN MIDELLWARE
    if (!req.files || Object.keys(req.files).length === 0|| !req.files.archivo) {
      res.status(400).send({msg: 'no hay archivos en la peticions'});
      return;
    }

    let modelo

    switch (coleccion) {
      case 'usuarios':
        modelo= await Usuario.findById(id)
          if(!modelo){
            return  res.status(400).json({
              msg:`No existe un usuario con el id ${id}`
            })
          }


        break;

        case 'productos':
        modelo= await Productos.findById(id)
          if(!modelo){
            return  res.status(400).json({
              msg:`No existe un producto con el id ${id}`
            })
          }

          
        break;
    
      default:
        return res.status(500).json({msg:'Se me olvido hacer esta coleccion '});
    }

    if(modelo.img){
        const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }


    const nombre= await subirArchivo(req.files,coleccion)
    modelo.img=nombre;
    
    await  modelo.save();

  res.json(modelo)

}

const mostrarImagen=(req,res= response)=>{
  const {id,coleccion}=req.params
  res.json({
    id,coleccion
  })
}

module.exports={
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}