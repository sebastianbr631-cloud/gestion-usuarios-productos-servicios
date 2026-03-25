const Producto = require('../models/producto');

const productosCtrl = {};

// GET todos los productos
productosCtrl.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos", detalle: err.message });
    }
};

// GET producto por ID
productosCtrl.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener producto", detalle: err.message });
    }
};

// POST crear producto
productosCtrl.createProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.json(productoGuardado);
    } catch (err) {
        res.status(500).json({ error: "Error al crear producto", detalle: err.message });
    }
};

// PUT actualizar producto por ID
productosCtrl.updateProducto = async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar producto", detalle: err.message });
    }
};

// DELETE producto por ID
productosCtrl.deleteProducto = async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
        res.json({ message: "Producto eliminado", producto: eliminado });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar producto", detalle: err.message });
    }
};

module.exports = productosCtrl;
