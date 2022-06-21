const {v4:uuidv4} = require('uuid');
const path= require('path')

const subirArchivo = (files,carpeta='',extencionesValidas=['png', 'jpg', 'jpeg', 'gif']) => {
    return new Promise((resolve, reject) => {
        const { archivo } =files;
        const nombreCortado = archivo.name.split('.')
        const extencion = nombreCortado[nombreCortado.length - 1]
        console.log(nombreCortado)

        // validar la extencion
        
        
        
        if (!extencionesValidas.includes(extencion)) {
            return reject( `la extencion ${extencion} no es permitida, ${extencionesValidas}`)
            
        }

        const nombreTemp = uuidv4() + "." + extencion;


        uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
               reject(err)
            }

           resolve(nombreTemp)
        });
    })


}

module.exports = {
    subirArchivo
}