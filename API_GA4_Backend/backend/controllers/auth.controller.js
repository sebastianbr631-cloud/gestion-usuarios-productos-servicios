const usuariosCtrl = require('./usuarios'); 
let usuarios = usuariosCtrl.usuarios || [];

const authCtrl = {};

// POST login
authCtrl.login = (req, res) => {
    const { username, password } = req.body;
    const user = usuarios.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });
    user.token = `token_${user.id}_${Date.now()}`;
    res.json({ token: user.token, usuario: user });
};

// GET token por username
authCtrl.getToken = (req, res) => {
    const username = req.params.username;
    const user = usuarios.find(u => u.username === username);
    res.json(user ? { token: user.token } : { error: "Usuario no encontrado" });
};

// PUT actualizar password
authCtrl.updatePassword = (req, res) => {
    const { username, newPassword } = req.body;
    const user = usuarios.find(u => u.username === username);
    if (!user) return res.status(404).json({ error: "Usuario no existe" });
    user.password = newPassword;
    res.json({ message: "Contraseña actualizada" });
};

// DELETE logout
authCtrl.logout = (req, res) => {
    const username = req.params.username;
    const user = usuarios.find(u => u.username === username);
    if (!user) return res.status(404).json({ error: "Usuario no existe" });
    user.token = null;
    res.json({ message: "Sesión cerrada" });
};

module.exports = authCtrl;


