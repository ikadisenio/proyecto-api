const { Router } = require('express');
const router = Router();
const ventasCtrl = require('../controllers/ventas.controller');

router.get('/top-productos', ventasCtrl.getTopProductos);
router.get('/top-tiendas', ventasCtrl.getTopTiendas);
router.get('/top-equipos', ventasCtrl.getTopEquipos);
router.get('/top-ejecutivos', ventasCtrl.getTopEjecutivos);


module.exports = router;
