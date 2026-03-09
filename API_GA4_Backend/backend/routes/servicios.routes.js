const { Router } = require('express');
const router = Router();
const serviciosCtrl = require('../controllers/servicios');

router.get('/', serviciosCtrl.getServicios);
router.get('/:id', serviciosCtrl.getServicioById);
router.post('/', serviciosCtrl.createServicio);
router.put('/:id', serviciosCtrl.updateServicio);
router.delete('/:id', serviciosCtrl.deleteServicio);

module.exports = router;
