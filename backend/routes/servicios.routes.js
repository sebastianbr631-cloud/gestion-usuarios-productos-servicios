const { Router } = require('express');
const router = Router();
const serviciosCtrl = require('../controllers/servicios');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, serviciosCtrl.getServicios);
router.get('/:id', verifyToken, serviciosCtrl.getServicioById);
router.post('/', verifyToken, serviciosCtrl.createServicio);
router.put('/:id', verifyToken, serviciosCtrl.updateServicio);
router.delete('/:id', verifyToken, serviciosCtrl.deleteServicio);

module.exports = router;