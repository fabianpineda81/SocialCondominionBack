const {Router}= require('express');
const { check } = require('express-validator');
const {login}= require('../controllers/auth');  
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();


router.post('/',cargarArchivo)
router.put('/:coleccion/:id',[
    check('id','el id debe ser un mongo id').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),

    validarCampos
],actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','el id debe ser un mongo id').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)
module.exports= router; 