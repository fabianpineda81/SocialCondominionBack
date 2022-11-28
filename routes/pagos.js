const {Router}= require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const { realizarPago, buscarPagos } = require('../controllers/Pagos');

const router = Router();
/* {{url}}/ categorias/ */




// midelware personalizado para saber si existe un id 
/* router.get("/:id",(rep,res)=>{
    res.json("todo ok id")
}) */
//buscar todas los pagos 
router.get("/",[
],buscarPagos)
// buscar las ordenes de pagos por id, puede ser id del usuario o id del pago
router.get("/:id",[
    check('id','el id debe ser un mongo id').isMongoId(),
    validarCampos
],buscarPagos)
// cualquier persona con un token

// se realiza el pago de una orden de pago
router.post("/:id",[
    validarJWT,  
    check("id","el ID de la order de pago  es obligatoria").notEmpty(),
    check("id","el ID de la order de pago  no es id valido").isMongoId(),
    check("stripeId","el ID de la compra es obligatoria").notEmpty(),
    check("userId","el valor es obligatorio").notEmpty(),
    check("userId","el user id no es un id valido").isMongoId(),
    validarCampos
],realizarPago)
// cualquiera persona con token






module.exports= router;