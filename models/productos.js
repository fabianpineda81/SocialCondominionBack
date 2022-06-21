const {Schema, model}= require('mongoose')

const ProductoSchema= Schema({
        nombre:{
            type:String,
            require:[true, 'el nombre es obligatorio']
        },
        estado:{
            type:Boolean,
            default:true,
            require:true,
        },
        usuario:{
            type:Schema.Types.ObjectId,
            ref:'Usuario',
            require:true 
        },
        precio:{
            type:Number,
            require:true,

        },
        categoria:{
            type:Schema.Types.ObjectId,
            ref:'Categoria',
            require:true
        },
        descripcion:{
            type:String
        },
        disponible:{
            type:Boolean, default:true
        },
        condicion:{
            type:String,
            require:true,
            emun:['NUEVO','COMO NUEVO','BUEN ESTADO','ACEPTADO']
        },
        img:{
            type:String
        }
        
        
})

ProductoSchema.methods.toJSON=function(){
    const {__v,estado,...data}= this.toObject();
    
    return data ;

}

module.exports= model( 'Producto',ProductoSchema)