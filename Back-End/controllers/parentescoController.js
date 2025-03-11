const Empleado = require('../models/parentescoModel');
const path = require('path');

exports.crearParentesco = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { parentesco_ } = req.body;

        const parentesco = new Parentesco({
            parentesco: parentesco_
        });

        await parentesco.save();
        res.status(201).json(parentesco);
    });
};

exports.obtenerParentescos = async (req, res) => {
    const parentescos = await Parentesco.find();
    res.json(parentescos);
};

exports.actualizarParentesco = async (req, res) => {
    const parentesco = await Parentesco.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(parentesco);
};

exports.eliminarParentesco = async (req, res) => {
    await Parentesco.findByIdAndDelete(req.params.id);
    res.status(204).send();
};