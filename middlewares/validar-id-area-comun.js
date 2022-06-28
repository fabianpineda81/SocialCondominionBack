const Area_comun = require("../models/area_comun")


const validarIdArea = async (id='') => {
    
        
        const areaComun  = await Area_comun.findById(id)

        if (!areaComun) {
           throw new Error(`No existe una area con el id ${nombre}`)
        }
    
    
}

module.exports = validarIdArea