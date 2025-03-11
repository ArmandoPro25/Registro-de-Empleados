const Empleado = require('../models/actividadModel');
const path = require('path');

exports.crearActividad = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { nombre, importancia} = req.body;

        const actividad = new Actividad({
            nombre: nombre,
            importancia: importancia
        });

        await actividad.save();
        res.status(201).json(actividad);
    });
};

exports.obtenerActividades = async (req, res) => {
    const actividades = await Actividad.find();
    res.json(actividades);
};

exports.actualizarActividad = async (req, res) => {
    const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actividad);
};

exports.eliminarActividad = async (req, res) => {
    await Actividad.findByIdAndDelete(req.params.id);
    res.status(204).send();
};