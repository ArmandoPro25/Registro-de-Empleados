const Parentesco = require('../models/parentescoModel');

exports.crearParentesco = async (req, res) => {
    try {
        const { parentesco } = req.body;
        
        if (!parentesco) {
            return res.status(400).json({ error: 'El parentesco es obligatorio' });
        }

        const nuevoParentesco = new Parentesco({ parentesco });
        await nuevoParentesco.save();
        res.status(201).json(nuevoParentesco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerParentescos = async (req, res) => {
    try {
        const parentescos = await Parentesco.find();
        res.json(parentescos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerParentescoPorId = async (req, res) => {
    try {
        const parentesco = await Parentesco.findById(req.params.id);
        if (!parentesco) return res.status(404).json({ error: 'Parentesco no encontrado' });
        res.json(parentesco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarParentesco = async (req, res) => {
    try {
        const parentesco = await Parentesco.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!parentesco) return res.status(404).json({ error: 'Parentesco no encontrado' });
        res.json(parentesco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarParentesco = async (req, res) => {
    try {
        const parentesco = await Parentesco.findByIdAndDelete(req.params.id);
        if (!parentesco) return res.status(404).json({ error: 'Parentesco no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};