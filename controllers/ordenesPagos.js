const { response } = require("express");
const Categoria = require("../models/categoria");
const OrdenesPagos = require("../models/OrdenesPagos");
const Usuario = require("../models/usuario");


// obtener categorias - paginado - total - pupulate 
const  CrearOrdenesPorid = async (req, res = response) => {
    const { id } = req.params
    const { valor, descripcion } = req.body
    const query = { _id: id, estado: true }
    
    if (id) {
        const data = {
            valor,
            descripcion,
            usuario: id
        }
        const usuario = await Usuario.findOne(query)
        console.log("paran orden pago",req.params)
        console.log("usuario orden pago",usuario)
        if (usuario) {
            const orden = new OrdenesPagos(data)
            await orden.save();
            res.json(orden)
        } else {
            res.status(404).json({
                msg: "no exite un usuario con ese id "
            })
        }

        return

    }

    const queryEstado = { estado: true }
    const todosUsuarios = await Usuario.find(queryEstado);
    const arrayPromesas = todosUsuarios.map(async (usuario) => {
        const data = {
            valor,
            descripcion,
            usuario: usuario._id
        }
        let orden = new OrdenesPagos(data)
        return await orden.save()


    })

    await Promise.all(arrayPromesas)

    return res.json({
        msg: "se crearon las ordenes de pagos a " + arrayPromesas.length+ "usuarios"
    })

}





// obtener categoria - populate  


const buscarOrdenes = async (req, res = response) => {
    
    
    const { id } = req.params
    const query = { usuario: id, estado: true }
    
    const ordenes = await OrdenesPagos.find(query).populate('usuario')
    if (ordenes) {
        res.json(ordenes)
    } else {
        res.status(404).json({
            msg: "no se encontraron ordenes de pago para ese usuario"
        })
    }

    return

}

// actualizar categoria 

const ordenesDelete=async (req, res = response) => {
    const {id} = req.params
   
    const categoria = await OrdenesPagos.findById(id).populate('usuario', 'nombre')
    
    return res.json({ categoria })
}

// borrar categoria - estado false 


module.exports = {
    buscarOrdenes,
    CrearOrdenesPorid,
    ordenesDelete
    
}