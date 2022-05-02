const { Schema, model } = require('mongoose');



const usuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'el nombre es obligatorio'],


    },
    correo:{
        type:String,
        required:[true, 'el correo es obligatorio'],
        unique:true, 

    },
    password:{
        type:String,
        required:[true, 'la contraseña es obligatoria '],
        

    },
    img:{
        type:String,
        
        

    },
    rol:{
        type:String,
        require:true,
        emun:['ADMIN_ROLE','USER_ROLE']
        
    },
    estado:{
        type:Boolean,
        default:true 
    },
    google:{
        type:Boolean,
        default:false 
    },



})


usuarioSchema.methods.toJSON=function(){
    const {__v,password,_id,...usuario}= this.toObject();
    usuario.uid=_id
    return usuario ;

}


module.exports =model('Usuario',usuarioSchema)
