const Puesto = require('../models/puestoModel');

exports.crearPuesto = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'Nombre son obligatorios' });
        }

        const puesto = new Puesto({ nombre });
        await puesto.save();
        res.status(201).json(puesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPuestos = async (req, res) => {
    try {
        const puestos = await Puesto.find();
        res.json(puestos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPuestoPorId = async (req, res) => {
    try {
        const puesto = await Puesto.findById(req.params.id);
        if (!puesto) return res.status(404).json({ error: 'Puesto no encontrado' });
        res.json(puesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarPuesto = async (req, res) => {
    try {
        const puesto = await Puesto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!puesto) return res.status(404).json({ error: 'Puesto no encontrado' });
        res.json(puesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarPuesto = async (req, res) => {
    try {
        const puesto = await Puesto.findByIdAndDelete(req.params.id);
        if (!puesto) return res.status(404).json({ error: 'Puesto no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};