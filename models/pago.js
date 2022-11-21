const { Schema, model } = require('mongoose')

const Pago = Schema({
    estado: {
        type: Boolean,
        default: true,
        require: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    OrdenDePago: {
        type: Schema.Types.ObjectId,
        ref: 'OrdenesPagos',
        require: true
    },
    idStripe:{
        type:String,
        require:true, 
    }

})

Pago.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();

    return data;

}

module.exports = model('Pago', Pago)