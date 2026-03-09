const Usuario = require('../models/usuario');

const usuariosCtrl = {};

// GET todos los usuarios
usuariosCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

// GET usuario por ID
usuariosCtrl.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};

// GET usuario por username
usuariosCtrl.getUsuarioByUsername = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ username: req.params.username });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};

// POST crear usuario
usuariosCtrl.createUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const guardado = await nuevoUsuario.save();
        res.json(guardado);
    } catch (err) {
        console.error(err); //  MUY IMPORTANTE
        res.status(500).json({ 
            error: "Error al crear usuario",
            detalle: err.message
        });
    }
};


// PUT actualizar usuario
usuariosCtrl.updateUsuario = async (req, res) => {
    try {
        const actualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
};

// DELETE usuario
usuariosCtrl.deleteUsuario = async (req, res) => {
    try {
        const eliminado = await Usuario.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

module.exports = usuariosCtrl;
