//Aqui van a ir todas las rutas que tengas que ver con autenticación

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Crear nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio ').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria (minimo 6 caracteres)').isLength({min: 6}),
    validarCampos 
], crearUsuario)

//Login de usuario
router.post('/',[//arreglo de midlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria (minimo 6 caracteres)').isLength({min: 6}),
    validarCampos
], loginUsuario)

//Validar y revalidar token
router.get('/renew',validarJWT, revalidarToken )



module.exports = router;