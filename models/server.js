const express = require('express')
var cors = require('cors')
const { dbConection } = require('../database/config')
const fileUpload= require('express-fileupload')


class Server{
    
    
     constructor(){
        this.app = express()
        this.port=process.env.PORT
        this.paths={
            authPath:'/api/auth',
            rutaUsuarios:'/api/usuarios',
            rutaCategoria:'/api/categorias',
            productos:'/api/productos',
            buscar:"/api/buscar",
            uploads:"/api/uploads",
            areaComun:"/api/areaComun",
            reserva:"/api/reserva"
            
            
        }

        // conectar a base de datos 
        this.conectarDB()
        // middelwares
        this.middlewares()

        //rutas 
        this.routes();
        
        
    }
    async conectarDB(){
        await dbConection();
    }

    routes(){
          this.app.use(this.paths.rutaUsuarios,require('../routes/usuarios'))  
          this.app.use(this.paths.authPath,require('../routes/auth'))
          this.app.use(this.paths.rutaCategoria,require('../routes/categorias'))
          this.app.use(this.paths.productos,require('../routes/productos'))
          this.app.use(this.paths.buscar,require('../routes/buscar'))
          this.app.use(this.paths.uploads,require('../routes/uploads'))
          this.app.use(this.paths.areaComun,require('../routes/areaComun'))
          this.app.use(this.paths.reserva,require('../routes/reserva'))
    
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        // carag de archivos
        this.app.use(fileUpload({ useTempFiles : true,tempFileDir : '/tmp/',createParentPath:true}));
    }

    listen(){
       this.app.listen(this.port,()=>{
            console.log("servidor corriendo en el puerto ",this.port)
          })
    }


}

module.exports=Server;