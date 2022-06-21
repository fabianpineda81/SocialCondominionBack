const {Router}= require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut, usuariosPutSinCedula } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId, existeUsuarioPorCedula } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();


router.get('/', usuariosGet)
router.get('/:cedula', usuariosGet)
  
  router.post('/',[
    check('nombre',"el nombre es obligatorio").notEmpty(),
    check('apellido',"el apellido es obligatorio").notEmpty(),
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
  
  router.put('/:cedula',[
    //check('id','no es un id valido').isMongoId(),
    /* check('cedula').notEmpty(),
    check('cedula').custom(existeUsuarioPorCedula),
    check('rol').custom(esRolValido), 
    check('correo',"el correo no es valido").isEmail(),
    check('correo').custom(emailExiste),
    check('celular',"el celular es obligatorio").notEmpty(),
     */
    check('nombre',"el nombre es obligatorio").notEmpty(),
    check('apellido',"el apellido es obligatorio").notEmpty(),
    
    check('correo',"el correo no es valido").isEmail(),
   //TODO REVISAR ESTO EL CORREO TIENE QUE SER UNICO PERO SIEMRE Y CUANDO SEA DISTINTO AL QUE TIENE ANTES  check('correo').custom(emailExiste),
    check('cedula',"la cedula es obligaria").notEmpty(),
    check('cedula',"no es una cedula valida").isNumeric().not(),
    check('apto',"el apartamento es obligatorio").notEmpty(),
    check("numero","el numero de telefono es obligtorio").notEmpty(),
    check("numero","el numero de telefono no es valido ").isNumeric().not(),
   




    validarCampos
  ],usuariosPut)

  router.put('/',usuariosPutSinCedula)


  router.delete('/:id',[
    validarJWT,
   // esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],usuariosDelete)


module.exports= router;
