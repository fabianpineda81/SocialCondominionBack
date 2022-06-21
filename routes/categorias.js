const {Router}= require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const { validationResult } = require("express-validator");
const { crearCategoria, obtenerCategorias, categoriaPut, categoriaDelete } = require('../controllers/categorias');
const validarNombreCategoria = require('../middlewares/validar-nombre-categoria');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();
/* {{url}}/ categorias/ */

router.get("/",obtenerCategorias)




// midelware personalizado para saber si existe un id 
/* router.get("/:id",(rep,res)=>{
    res.json("todo ok id")
}) */

router.get("/:nombre",[
    check("nombre").custom(validarNombreCategoria),
    validarCampos
],obtenerCategorias)
// cualquier persona con un token
router.post("/",[
    validarJWT,  
    check('nombre','el nombre es obligatorio').notEmpty(),
    validarCampos
],crearCategoria)
// cualquiera persona con token
router.put("/:nombreb",[
    validarJWT,
    check("nombreb").custom(validarNombreCategoria),
    validarCampos
],categoriaPut)

// solo admin
router.delete("/:nombre",[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check("nombre").custom(validarNombreCategoria),
    validarCampos
],categoriaDelete)




module.exports= router;