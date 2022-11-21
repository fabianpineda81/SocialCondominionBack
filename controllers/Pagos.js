const { response } = require("express");
const { default: Stripe } = require("stripe");

const OrdenesPagos = require("../models/OrdenesPagos");

const Pago = require("../models/pago");

const Usuario = require("../models/usuario");
const { param } = require("../routes/pagos");

const buscarPagos=async (req, res = response)=>{
    const {id}= req.params
    if(!id){
        let pagos = await Pago.find()
        return res.json({
            pagos
        })
    }else{
        let usuario = await Usuario.findById(id)
        if(usuario){
            let pagos = await Pago.find({usuario:id})
            return res.json(
                pagos
            )
        }
        let pago = await Pago.findById(pago)
        if(pago){
            return res.json(pago)
        }
        return res.status(401).json({
            msg:"no se encontro informacion con ese id "
        })
    }
}
const realizarPago= async(req, res = response)=>{
    const { userId, stripeId } = req.body
    const {id}= req.params
    const usuario =await Usuario.findById(userId)
    const ordenPago=await OrdenesPagos.findById(id)
    const stripe=  new Stripe("sk_test_51LGT03K5oKUNKxbPxhx8hVUO3Tur4G9DWWspyBRNzt58FvIOhWqVzqLuCi83aTD9AziPxh7wA1FnX9FFvNSqX5ZY00Yucb1JIN")
    
    if(!usuario){
            return res.status(401).json({
                msg:"no existe un usuario con ese id"
            })
    }
    if(!ordenPago){
        return res.status(401).json({
            msg:"no existe una orden de pago con ese id"
        })
    }
    try {
        const payment=  await stripe.paymentIntents.create({
            amount:ordenPago.valor*10,
            currency:"COP",
            description:ordenPago.id,
            payment_method:stripeId,
            confirm:true 
        })

        console.log("pago realizodo",ordenPago)
       let newordenPago=  await OrdenesPagos.findByIdAndUpdate(id,{estado:false})
        data={
            usuario:usuario.id,
            ordenDePago:ordenPago.id,
            idStripe:stripeId
        }
     let newPago= await new Pago(data).save()
     
     
    return res.json({
        newordenPago,
        newPago,
        msg:"pago realizado correctemente"
    })


    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
   

console.log("pago realizodo",ordenPago)
    return res.json(ordenPago)

    
}

module.exports = {
  buscarPagos,
  realizarPago
    
}