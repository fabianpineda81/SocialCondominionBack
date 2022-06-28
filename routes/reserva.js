const {Router}= require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const { validationResult } = require("express-validator");
const validarNombreCategoria = require('../middlewares/validar-nombre-categoria');
const { tieneRole } = require('../middlewares/validar-roles');
const { obtenerReservas, crearReserva, reservaDelete, reservaPut } = require('../controllers/reserva');

const router = Router();
/* {{url}}/ categorias/ */

router.get("/:areaComun",[
    validarJWT,
    check('areaComun',"el area comun es obligatoria").notEmpty(),
    check("areaComun","el area comun debe ser un id valido").isMongoId(),
    validarCampos
],obtenerReservas)




// midelware personalizado para saber si existe un id 
/* router.get("/:id",(rep,res)=>{
    res.json("todo ok id")
}) */


router.post("/:areaComun",[
    validarJWT,  
    check('areaComun',"el area comun es obligatoria").notEmpty(),
    check("areaComun","el area comun debe ser un id valido").isMongoId(),
    check('nombre','el nombre es obligatorio').notEmpty(),
    check('objeto',"el objeto es obligatorio").notEmpty(),
    validarCampos
],crearReserva)
// cualquiera persona con token
router.put("/:id",[
    validarJWT,
    check("id","el id el obligatorio").notEmpty(),
    check("id","el id tiene que ser un id valido").isMongoId(),
    check('objeto',"el objeto es obligatorio").notEmpty(),
    validarCampos
],reservaPut)

// solo admin
router.delete("/:nombre",[
    validarJWT,
    check("id","el id el obligatorio").notEmpty(),
    check("id","el id tiene que ser un id valido").isMongoId(),
    validarCampos
],reservaDelete)




module.exports= router;