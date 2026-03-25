const { Router } = require('express');
const router = Router();
const usuariosCtrl = require('../controllers/usuarios');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, usuariosCtrl.getUsuarios);
router.get('/id/:id', verifyToken, usuariosCtrl.getUsuarioById);
router.get('/username/:username', verifyToken, usuariosCtrl.getUsuarioByUsername);
router.post('/', verifyToken, usuariosCtrl.createUsuario);
router.put('/:id', verifyToken, usuariosCtrl.updateUsuario);
router.delete('/:id', verifyToken, usuariosCtrl.deleteUsuario);

module.exports = router;