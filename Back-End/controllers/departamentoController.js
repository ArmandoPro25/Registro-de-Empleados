const Empleado = require('../models/departamentoModel');
const path = require('path');

exports.crearDepartamento = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { nombre, estatus} = req.body;

        const departamento = new Departamento({
            nombre: nombre,
            estatus: estatus
        });

        await departamento.save();
        res.status(201).json(departamento);
    });
};

exports.obtenerDepartamentos = async (req, res) => {
    const departamento = await Departamento.find();
    res.json(departamentos);
};

exports.actualizarDepartamento = async (req, res) => {
    const departamento = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(departamento);
};

exports.eliminarDepartamento = async (req, res) => {
    await Departamento.findByIdAndDelete(req.params.id);
    res.status(204).send();
};