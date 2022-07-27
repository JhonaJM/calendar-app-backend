
/*
events routes
host +  / api/events
*/

const {Router} = require('express');
const {check} = require('express-validator')
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos,crearEventos,ActualizarEventos,EliminarEventos} = require('../controllers/events');
const {validarCampos} = require('../middlewares/validar-campos');
const { route } = require('./auth');
const { isDate } = require('../helpers/isDate');
const router = Router();

//para no llamar al webtoken en cada router lo hacemos de manera general ↓
//todas validaciones deben pasar por el web token
router.use(validarJWT);

//obtener eventos
router.get('/',getEventos);

//crear evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEventos);
//actualizar evento
router.put(
    '/:IdEvento',
    [        
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos              
    ],ActualizarEventos);
//borrar eventos
router.delete('/:IdEvento',EliminarEventos);

module.exports = router;