const {Schema, model}= require('mongoose')

const AreaComun= Schema({
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
        }
        
})

AreaComun.methods.toJSON=function(){
    const {__v,estado,...data}= this.toObject();
    
    return data ;

}

module.exports= model('AreaComun',AreaComun)