const {Schema, model}= require('mongoose')

const Reserva= Schema({
        nombre:{
            type:String,
            require:[true, 'el nombre es obligatorio']
        },
        id:{
            type:String,
            require:[true, 'el id es obligatorio']
        },
        StringObjeto:{
            type:String,
            default:true,
            require:true,
        },
        usuario:{
            type:Schema.Types.ObjectId,
            ref:'Usuario',
            require:true 
        },
        AreaComun:{
            type:Schema.Types.ObjectId,
            ref:'AreaComun',
            require:true 
        }
        
})

Reserva.methods.toJSON=function(){
    const {__v,estado,...data}= this.toObject();
    
    return data ;

}

module.exports= model('Reserva',Reserva)