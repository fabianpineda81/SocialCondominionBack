const Categoria = require("../models/categoria")

const validarNombreCategoria = async (nombre='') => {
    
        
        const queryNombre = { nombre:nombre.toUpperCase(), estado: true }
        const categoria = await Categoria.findOne(queryNombre)

        if (!categoria) {
           throw new Error(`No existe una categoria con el nombre ${nombre}`)
        }
    
    
}

module.exports = validarNombreCategoria