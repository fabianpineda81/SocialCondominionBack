const { response } = require("express");
const Area_comun = require("../models/area_comun");



// obtener categorias - paginado - total - pupulate 
const obtenerAreaComun = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const {id}=req.params
    const query={estado:true}
    console.log("Area Comun",id)
    if(id){
        
        const areaComun = await Area_comun.findById(id).populate('usuario')
        if(areaComun){
            res.json(areaComun)
        }else{
          res.status(404).json({
            msg:"no se encontro una categoria con ese nombre"
          })
        }
      
        return
        
       }



    const [total, areasComun]= await Promise.all([
        Area_comun.countDocuments(query),
        Area_comun.find(query).skip(desde).limit(limite).populate('usuario','nombre')
       ])
    
        res.json({
          total,
          areasComun
        })

}

// obtener categoria - populate  


const crearAreaComun = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Area_comun.findOne({ nombre }).populate('usuario','nombre')
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La area comun  ${categoriaDB.nombre} ya existe`
        })
    }

    // generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const areacomun = new Area_comun(data)
    // guarda db 

    await areacomun.save();
    res.status(201).json(areacomun)


}

// actualizar categoria 
const areaComunPut=async(req, res = response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const {id}= req.params
    
    console.log("id area comun",id)
    
    const areaComun = await Area_comun.findOne({ nombre }).populate('usuario','nombre')
    
    console.log("nombre",nombre)
    

    if (areaComun){ 
        return res.status(400).json({
            msg: `ya existe un area comun con ese nombre ${nombre} `
        })
    }

    // generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    //const categoria = new Categoria(data)
    // guarda db 
    const resultArea = await Area_comun.findByIdAndUpdate(id,data).populate('usuario','nombre')
    
    res.status(201).json(resultArea)


}

const areaComunDelete=async(req, res=response)=>{
    const {nombre}= req.params
    const usuarioAutenticado= req.usuario
    

    const categoria = await Area_comun.findOneAndUpdate(nombre,{estado:false}).populate('usuario','nombre')
    
    return res.json({categoria})
}

// borrar categoria - estado false 


module.exports = {
    obtenerAreaComun,
    crearAreaComun,
    areaComunPut,
    areaComunDelete
}