const {Router}= require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const { validationResult } = require("express-validator");

const validarNombreCategoria = require('../middlewares/validar-nombre-categoria');
const { tieneRole } = require('../middlewares/validar-roles');
const { obtenerAreaComun, crearAreaComun, areaComunPut, areaComunDelete } = require('../controllers/areaComun');
const validarIdArea = require('../middlewares/validar-id-area-comun');

const router = Router();
/* {{url}}/ categorias/ */

router.get("/",obtenerAreaComun)




// midelware personalizado para saber si existe un id 
/* router.get("/:id",(rep,res)=>{
    res.json("todo ok id")
}) */

router.get("/:nombre",[
    check("nombre").custom(validarNombreCategoria),
    validarCampos
],obtenerAreaComun)
// cualquier persona con un token
router.post("/",[
    validarJWT,  
    check('nombre','el nombre es obligatorio').notEmpty(),
    validarCampos
],crearAreaComun)
// cualquiera persona con token
router.put("/:id",[
    validarJWT,
    check("id").isMongoId(),
    check("id").custom(validarIdArea),
    validarCampos
],areaComunPut)

// solo admin
router.delete("/:nombre",[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check("nombre").custom(validarNombreCategoria),
    validarCampos
],areaComunDelete)




module.exports= router;