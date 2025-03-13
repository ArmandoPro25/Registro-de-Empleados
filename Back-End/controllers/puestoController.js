const Puesto = require('../models/puestoModel');
const path = require('path');

exports.crearPuesto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { nombre, estatus} = req.body;

        const puesto = new Puesto({
            nombre: nombre,
            estatus: estatus
        });

        await puesto.save();
        res.status(201).json(puesto);
    });
};

exports.obtenerPuestos = async (req, res) => {
    const puestos = await Puesto.find();
    res.json(puestos);
};

exports.actualizarPuesto = async (req, res) => {
    const puesto = await Puesto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(puesto);
};

exports.eliminarPuesto = async (req, res) => {
    await Puesto.findByIdAndDelete(req.params.id);
    res.status(204).send();
};