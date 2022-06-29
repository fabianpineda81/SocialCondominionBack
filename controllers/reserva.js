const { response } = require("express");
const Categoria = require("../models/categoria");
const Reserva = require("../models/reservas");
const usuario = require("../models/usuario");


// obtener categorias - paginado - total - pupulate 
const obtenerReservas = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const {areaComun}=req.params
    const query={AreaComun:areaComun}
    console.log("areaComun",areaComun)
        
        const reservas = await Reserva.find(query).populate('usuario').populate('AreaComun')
        if(reservas){
            res.json({result:reservas})
        }else{
          res.status(404).json({
            msg:"no se encontro reservas para esta area comun"
          })
        }
      
        return
        
    




}

// obtener categoria - populate  


const crearReserva = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const objeto = req.body.objeto;
    const id = req.body.id;
    const {areaComun}=req.params

    console.log("creacion reserva",req.body)
    /* const categoriaDB = await Categoria.findOne({ nombre }).populate('usuario','nombre')
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria  ${categoriaDB.nombre} ya existe`
        })
    }
 */
    // generar la data a guardar 
    const data = {
        id,
        nombre,
        usuario: req.usuario._id,
        StringObjeto:objeto,
        AreaComun:areaComun
    }

    const reserva = new Reserva(data)
    // guarda db 

    await reserva.save();
    res.status(201).json(reserva)


}

// actualizar categoria 
const reservaPut=async(req, res = response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const objeto = req.body.objeto;

    const id= req.params
    const reserva = await Reserva.findById(id).populate('usuario').populate("areaComun")
    
    console.log("reserva a modificar", id)
    
    if (!reserva) {
        return res.status(400).json({
            msg: `no existe una reserva con ese di`
        })
    }

    // generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id,
        StringObjeto:objeto

    }

    //const categoria = new Categoria(data)
    // guarda db 
    const resultaCategoria = await Reserva.findById(id,data).populate('usuario').populate("areaComun")
    
    res.status(201).json(resultaCategoria)


}

const reservaDelete=async(req, res=response)=>{
    const {id}= req.params
    const usuarioAutenticado= req.usuario
    

    const reserva = await Reserva.findOneAndDelete({id})
    
    return res.json(reserva)
}

// borrar categoria - estado false 


module.exports = {
    crearReserva,
    reservaPut,
    reservaDelete,
    obtenerReservas

}