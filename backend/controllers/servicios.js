const Servicio = require('../models/servicio');

const serviciosCtrl = {};

// GET todos los servicios
serviciosCtrl.getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.json(servicios);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener servicios", detalle: err.message });
    }
};

// GET servicio por ID
serviciosCtrl.getServicioById = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) return res.status(404).json({ error: "Servicio no encontrado" });
        res.json(servicio);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener servicio", detalle: err.message });
    }
};

// POST crear servicio
serviciosCtrl.createServicio = async (req, res) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        const servicioGuardado = await nuevoServicio.save();
        res.json(servicioGuardado);
    } catch (err) {
        res.status(500).json({ error: "Error al crear servicio", detalle: err.message });
    }
};

// PUT actualizar servicio por ID
serviciosCtrl.updateServicio = async (req, res) => {
    try {
        const actualizado = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ error: "Servicio no encontrado" });
        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar servicio", detalle: err.message });
    }
};

// DELETE servicio por ID
serviciosCtrl.deleteServicio = async (req, res) => {
    try {
        const eliminado = await Servicio.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: "Servicio no encontrado" });
        res.json({ message: "Servicio eliminado", servicio: eliminado });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar servicio", detalle: err.message });
    }
};

module.exports = serviciosCtrl;
