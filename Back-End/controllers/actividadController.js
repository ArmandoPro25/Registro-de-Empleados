const Actividad = require('../models/actividadModel');

exports.crearActividad = async (req, res) => {
    try {
        const { nombre} = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'Nombre son obligatorios' });
        }

        const actividad = new Actividad({ nombre });
        await actividad.save();
        res.status(201).json(actividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerActividades = async (req, res) => {
    try {
        const actividads = await Actividad.find();
        res.json(actividads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerActividadPorId = async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id);
        if (!actividad) return res.status(404).json({ error: 'Actividad no encontrado' });
        res.json(actividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarActividad = async (req, res) => {
    try {
        const actividad = await Actividad.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actividad) return res.status(404).json({ error: 'Actividad no encontrado' });
        res.json(actividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarActividad = async (req, res) => {
    try {
        const actividad = await Actividad.findByIdAndDelete(req.params.id);
        if (!actividad) return res.status(404).json({ error: 'Actividad no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};