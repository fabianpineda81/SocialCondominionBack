const {Router}= require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const { validationResult } = require("express-validator");

const validarNombreCategoria = require('../middlewares/validar-nombre-categoria');
const { tieneRole } = require('../middlewares/validar-roles');
const res = require('express/lib/response');
const { obtenerReservas, crearReserva, reservaDelete } = require('../controllers/reserva');
const { CrearOrdenesPorid, buscarOrdenes, ordenesDelete, buscarOrdenesCedula } = require('../controllers/ordenesPagos');

const router = Router();
/* {{url}}/ categorias/ */





// midelware personalizado para saber si existe un id 
/* router.get("/:id",(rep,res)=>{
    res.json("todo ok id")
}) */

router.get("/:id",[
    //validarJWT,
    check("id").notEmpty(),
    check('id','el id debe ser un mongo id').isMongoId(),
    validarCampos
],buscarOrdenes)

router.get("/",[
    //validarJWT,
],buscarOrdenes)
router.get("/cedula/:cedula",[
   // validarJWT,
    check("cedula").notEmpty(),
    check("cedula","no es una cedula valida").isNumeric(),
    validarCampos
],buscarOrdenesCedula)
// cualquier persona con un token
router.post("/",[
    validarJWT, 
    check("valor","el valor es obligatorio").notEmpty(), 
    check("descripcion","la descripcion es obligatoria").notEmpty(),
    check("valor","el valor debe ser un valor valido").isNumeric(),
    validarCampos
],CrearOrdenesPorid)

router.post("/:id",[
    validarJWT,  
    check("descripcion","la descripcion es obligatoria").notEmpty(),
    check("valor","el valor es obligatorio").notEmpty(),
    check("valor","el valor debe ser un valor valido").isNumeric(),
    check("id","el id debe ser un id valido").isMongoId(),
    validarCampos
],CrearOrdenesPorid)
// cualquiera persona con token

// solo admin
router.delete("/:idOrdenCobro",[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
],ordenesDelete)




module.exports= router;