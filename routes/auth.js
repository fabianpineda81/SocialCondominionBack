const {Router}= require('express');
const { check } = require('express-validator');
const {login}= require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();


router.post('/login',[
    check('correo','el correo es obligatorio').notEmpty(),
    check('correo',"el no es valido ").isEmail(),
    check('password',"la contraseña es obligatoria").notEmpty(),
    validarCampos
], login)

module.exports= router;
  
