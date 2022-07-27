/*
rutas del usuario / auth
host +  / api/auth
*/
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator')
const { crearUsuario,loginUsuario,RevalidarToken } = require('../controllers/auth')
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
router.post('/new',
[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','el password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
] /**← coleccion de middlewares */,
crearUsuario);


router.post('/',
[
    check('email','El email es obligatorio').isEmail(),
    check('password','el password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
] /**← coleccion de middlewares */,
loginUsuario);


router.get('/renew',[validarJWT],RevalidarToken);


module.exports = router;