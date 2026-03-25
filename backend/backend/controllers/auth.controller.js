const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const authCtrl = {};

// LOGIN
authCtrl.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no existe' });

    const isMatch = password === usuario.password; // O bcrypt.compare si usas hash
    if (!isMatch) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, username: usuario.username },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PASSWORD
authCtrl.updatePassword = async (req, res) => { /* ... */ };

// LOGOUT
authCtrl.logout = (req, res) => { res.json({ message: 'Logout exitoso' }); };

module.exports = authCtrl;