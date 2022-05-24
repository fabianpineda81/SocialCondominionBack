const {Router}= require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();


router.get('/', usuariosGet)
router.get('/:cedula', usuariosGet)
  
  router.post('/',[
    check('nombre',"el nombre es obligatorio").notEmpty(),
    check('password',"el password es obligatorio y mas de 6 caracteres").isLength({min:6}),
    
    check('correo',"el correo no es valido").isEmail(),
    check('correo').custom(emailExiste),
    check('cedula',"la cedula es obligaria").notEmpty(),
    check('cedula',"no es una cedula valida").isNumeric().not(),
    check('apto',"el apartamento es obligatorio").notEmpty(),
    check("numero","el numero de telefono es obligtorio").notEmpty(),
    check("numero","el numero de telefono no es valido ").isNumeric().not(),
    //check('rol',"NO es un rol valido ").isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
  ],usuariosPost)
  
  router.put('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido), 
    validarCampos
  ],usuariosPut)

  router.delete('/:id',[
    validarJWT,
   // esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],usuariosDelete)


module.exports= router;
