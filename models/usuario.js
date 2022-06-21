const { Schema, model } = require('mongoose');



const usuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'el nombre es obligatorio'],


    },
    apellido:{
        type:String,
        required:[true, 'el apellido  es obligatorio'],


    },
    cedula:{
        type:Number,
        required:[true, 'la cedula es obligatoria'],
        unique:true

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
    apto:{
        type:String,
        required:[true,"El apartamento es obligatorio"]
    },
    numero:{
        type:Number,
        required:[true,"El numero es obligatorio"]
    },
    img:{
        type:String
    }





})


usuarioSchema.methods.toJSON=function(){
    const {__v,password,_id,...usuario}= this.toObject();
    usuario.uid=_id
    usuario.id= _id
    return usuario ;

}


module.exports =model('Usuario',usuarioSchema)
