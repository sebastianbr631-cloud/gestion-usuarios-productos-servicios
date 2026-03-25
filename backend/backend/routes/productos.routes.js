const { Router } = require('express');
const router = Router();
const productosCtrl = require('../controllers/productos');
const verifyToken = require('../middlewares/verifyToken');

//  PROTEGIDAS
router.get('/', verifyToken, productosCtrl.getProductos);
router.get('/:id', verifyToken, productosCtrl.getProductoById);
router.post('/', verifyToken, productosCtrl.createProducto);
router.put('/:id', verifyToken, productosCtrl.updateProducto);
router.delete('/:id', verifyToken, productosCtrl.deleteProducto);

module.exports = router;