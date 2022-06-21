const {Router}= require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');

const validarNombreCategoria = require('../middlewares/validar-nombre-categoria');
const { tieneRole } = require('../middlewares/validar-roles');
const { productoPost, productosGet, productoPut, productoDelete } = require('../controllers/productos');

const router = Router();
/* {{url}}/ categorias/ */

router.get("/",productosGet)




// midelware personalizado para saber si existe un id 
/* router.get("/:id",(rep,res)=>{
    res.json("todo ok id")
}) */

router.get("/:id",[
    check("id").isMongoId(),
    validarCampos
],productosGet)
// cualquier persona con un token
router.post("/",[
    validarJWT,  
    
    check('nombre','el nombre es obligatorio').notEmpty(),
    check('precio',"el precio es obligatorio").notEmpty(),

    check('categoria',"el id de la categoria es obligatrio").notEmpty(),
    check('categoria',"el id de la categoria no es un id valido").isMongoId(),

    check("descripcion","la descripcion es obligaria").notEmpty(),

    check("condicion","la condicion es obligatoria").notEmpty(),

    validarCampos
],productoPost)

// cualquiera persona con token
router.put("/:id",[
    validarJWT,
    validarCampos
],productoPut)

// solo admin
router.delete("/:id",[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
],productoDelete)




module.exports= router;