const { response } = require("express");
const res = require("express/lib/response");
const Categoria = require("../models/categoria");
const Productos = require("../models/productos");

const Usuario = require("../models/usuario");
const {ObjectId}=require('mongoose').Types
const coleccionesPermitidas=[
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios=async(termino='',res=response)=>{
    const esMongoID= ObjectId.isValid(termino);//  true
    console.log("id de mongo valido",esMongoID)
    if(esMongoID){
        const usuario = await Usuario.findById(termino)
      return  res.json({
            results:(usuario)?[usuario]: [] 
        })
    }
    const regex=new RegExp(termino,'i')
    const usuarios= await Usuario.find({
        $or:[{nombre:regex},{correo:regex}]
    })
    return  res.json({
        results:usuarios
    })

}

const buscarProductos=async(termino='',res=response)=>{
    const esMongoID= ObjectId.isValid(termino);//  true
    console.log("id de mongo valido",esMongoID)
    


    if(esMongoID){
        const categoria = await Categoria.findById(termino)
        console.log("categoia encontrada en productos",categoria)
        
        if(categoria){
          const productos =await buscarProductosCategorias(categoria);
          return res.json({
            results:productos
          })
        }
        
        const producto = await productos.findById(termino)
      
        return  res.json({
            results:(producto)?[producto]: [] 
        })
    }

    const regex=new RegExp(termino,'i')
    
    const productos= await Productos.find({
        $or:[{nombre:regex}]
    })
    
    return  res.json({
        results:productos
    })

}
const buscarProductosCategorias=async(categoria)=>{
    const id = categoria.id
    console.log("id de la categoria a buscar",id)
    const productos= await Productos.find({categoria:id})
    return productos
}

const buscar=(req,res= response)=>{


    const {coleccion,termino}=req.params;
    
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'usuarios':
            console.log("buscando usuario",termino)
            buscarUsuarios(termino,res)
        break;
        
        case 'categorias':
        
        break;
        
        case 'productos':
            buscarProductos(termino,res) 
        break;
         
        default:
                res.status(500).json({
                    msg:"se me olvido hacer esta buqueda "
                })

    }

   
}

module.exports={
    buscar
}