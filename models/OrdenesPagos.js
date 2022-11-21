const { Schema, model } = require('mongoose')

const OrdenesPagos = Schema({
    valor: {
        type: Number,
        require: [true, 'el valor es obligatorio es obligatorio']
    },
    descripcion: {
        type: String,
        require: [true, 'el  es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        require: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }

})

OrdenesPagos.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();

    return data;

}

module.exports = model('OrdenesPagos', OrdenesPagos)