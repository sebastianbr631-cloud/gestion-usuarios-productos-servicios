const { Router } = require('express');
const router = Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/login', authCtrl.login);
router.get('/token/:username', authCtrl.getToken);
router.put('/password', authCtrl.updatePassword);
router.delete('/logout/:username', authCtrl.logout);


module.exports = router;
