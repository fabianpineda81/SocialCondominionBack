const express = require('express')
var cors = require('cors')
const { dbConection } = require('../database/config')


class Server{
    
    
     constructor(){
        this.app = express()
        this.port=process.env.PORT
        this.authPath='/api/auth'
        this.rutaUsuarios='/api/usuarios'
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
          this.app.use(this.rutaUsuarios,require('../routes/usuarios'))  
          this.app.use(this.authPath,require('../routes/auth'))
    
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    listen(){
       this.app.listen(this.port,()=>{
            console.log("servidor corriendo en el puerto ",this.port)
          })
    }


}

module.exports=Server;