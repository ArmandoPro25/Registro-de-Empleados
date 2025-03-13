const Departamento = require('../models/departamentoModel');

exports.crearDepartamento = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({ error: 'Nombre son obligatorios' });
        }

        const departamento = new Departamento({nombre});
        await departamento.save();
        res.status(201).json(departamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerDepartamentoPorId = async (req, res) => {
    try {
        const departamento = await Departamento.findById(req.params.id);
        if (!departamento) return res.status(404).json({ error: 'Departamento no encontrado' });
        res.json(departamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarDepartamento = async (req, res) => {
    try {
        const departamento = await Departamento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!departamento) return res.status(404).json({ error: 'Departamento no encontrado' });
        res.json(departamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarDepartamento = async (req, res) => {
    try {
        const departamento = await Departamento.findByIdAndDelete(req.params.id);
        if (!departamento) return res.status(404).json({ error: 'Departamento no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};