const { Router } = require('express');
const router = Router();
const authCtrl = require('../controllers/auth.controller');

// LOGIN
router.post('/login', authCtrl.login);

// ACTUALIZAR PASSWORD
router.put('/password', authCtrl.updatePassword);

// LOGOUT (opcional, más informativo)
router.post('/logout', authCtrl.logout);

module.exports = router;
