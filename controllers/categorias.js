const { response } = require("express");
const Categoria = require("../models/categoria");
const usuario = require("../models/usuario");


// obtener categorias - paginado - total - pupulate 
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const {nombre}=req.params
    const query={estado:true}
    console.log("nombre",nombre)
    if(nombre){
        const queryNombre={nombre,estado:true}
        const categoria = await Categoria.findOne(queryNombre).populate('usuario')
        if(categoria){
            res.json(categoria)
        }else{
          res.status(404).json({
            msg:"no se encontro una categoria con ese nombre"
          })
        }
      
        return
        
       }



    const [total, categorias]= await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(desde).limit(limite).populate('usuario','nombre')
       ])
    
        res.json({
          total,
          categorias
        })

}

// obtener categoria - populate  


const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre }).populate('usuario','nombre')
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria  ${categoriaDB.nombre} ya existe`
        })
    }

    // generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    // guarda db 

    await categoria.save();
    res.status(201).json(categoria)


}

// actualizar categoria 
const categoriaPut=async(req, res = response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const nombreB= req.params
    const categoriaDB = await Categoria.findOne({ nombreB }).populate('usuario','nombre')
    console.log("nombre",nombre)
    if (!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${nombre} no  existe`
        })
    }

    // generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //const categoria = new Categoria(data)
    // guarda db 
    const resultaCategoria = await Categoria.findOneAndUpdate({nombreB},data).populate('usuario','nombre')
    
    res.status(201).json(resultaCategoria)


}

const categoriaDelete=async(req, res=response)=>{
    const {nombre}= req.params
    const usuarioAutenticado= req.usuario
    

    const categoria = await Categoria.findOneAndUpdate(nombre,{estado:false}).populate('usuario','nombre')
    
    return res.json({categoria})
}

// borrar categoria - estado false 


module.exports = {
    crearCategoria,
    obtenerCategorias,
    categoriaPut,
    categoriaDelete
}