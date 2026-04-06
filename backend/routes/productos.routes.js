const { Router } = require('express');
const router = Router();
const productosCtrl = require('../controllers/productos');

// Rutas CRUD funcionales sin login
router.get('/', productosCtrl.getProductos);
router.get('/:id', productosCtrl.getProductoById);
router.post('/', productosCtrl.createProducto);
router.put('/:id', productosCtrl.updateProducto);
router.delete('/:id', productosCtrl.deleteProducto);

module.exports = router;