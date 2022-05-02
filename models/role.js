const {Schema, model}= require('mongoose')

const RoleSchema= Schema({
        rol:{
            type:String,
            require:[true, 'el rol es obligatorio']
        },
        
})

module.exports= model( 'Role',RoleSchema)