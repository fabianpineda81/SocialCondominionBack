const { response } = require("express");
const Categoria = require("../models/categoria");
const Producto = require("../models/productos");
const usuario = require("../models/usuario");


// obtener categorias - paginado - total - pupulate 
const productosGet = async (req, res = response) => {
    const { limite = 50, desde = 0 } = req.query
    const {id}=req.params
    const query={estado:true}
    console.log("id",id)
    if(id){
        
        const queryNombre={id,estado:true}
        const producto= await Producto.findById(id).populate('categoria').populate('usuario',"nombre")
        
        
        if(producto){
            res.json(producto)
        }else{
          res.status(404).json({
            msg:"no se encontraron productos con ese nombre"
          })
        }
      
        return
        
       }



    const [total, productos]= await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).skip(desde).limit(limite).populate('categoria').populate('usuario')
       ])
    
        res.json({
          total,
          productos 
        })

}

// obtener categoria - populate  


const productoPost = async (req, res = response) => {
    const {nombre,precio,categoria,descripcion,condicion}= req.body;
    
    if(!req.usuario){
        return res.status(500).json({
            msg:"no se valido el token"
        })
    }
    
    const usuario = req.usuario._id

    // generar la data a guardar 
    
    const data = {
        usuario,
        nombre,
        precio,
        categoria,
        descripcion,
        condicion
    }
    const nProducto = new Producto(data)
  const productoR=  await nProducto.save();
    res.status(201).json(productoR)


}

// actualizar categoria 
const productoPut=async(req, res = response)=>{
    const {__id,...data}= req.body
    if(!req.usuario){
        return res.status(500).json({
            msg:"no se valido el token"
        })
    }
    console.log("id a modificar",req.params)
    console.log("body Producto",req.body)

    const {id}= req.params
    const ProductoDB = await Producto.findById(id)
    
    
    

    if (!ProductoDB) {
        return res.status(400).json({
            msg: `el producto con el id ${id} no  existe`
        })
    }

    // generar la data a guardar 
     

    //const categoria = new Categoria(data)
    // guarda db 
    const resultaCategoria = await Producto.findByIdAndUpdate(id,data)
    console.log("categoria modificada",resultaCategoria)
    res.status(201).json(resultaCategoria)


}

const productoDelete=async(req, res=response)=>{
    const {id}= req.params
    const usuarioAutenticado= req.usuario
    
    
    const producto = await Producto.findByIdAndUpdate(id,{estado:false,usuario:usuarioAutenticado.id})
    
    return res.json(producto)
}

// borrar categoria - estado false 


module.exports = {
  productoPost,
  productoPut,
  productosGet,
  productoDelete
}