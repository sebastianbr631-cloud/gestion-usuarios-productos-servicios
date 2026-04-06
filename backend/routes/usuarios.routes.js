const { Router } = require('express');
const router = Router();
const usuariosCtrl = require('../controllers/usuarios');

// Rutas CRUD funcionales sin login
router.get('/', usuariosCtrl.getUsuarios);
router.get('/id/:id', usuariosCtrl.getUsuarioById);
router.get('/username/:username', usuariosCtrl.getUsuarioByUsername);
router.post('/', usuariosCtrl.createUsuario);
router.put('/:id', usuariosCtrl.updateUsuario);
router.delete('/:id', usuariosCtrl.deleteUsuario);

module.exports = router;