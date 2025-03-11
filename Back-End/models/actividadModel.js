const mongoose = require('mongoose');

const ActividadSchema = new mongoose.Schema({
    nombre: String,
    estatus: String
});

module.exports = mongoose.model('Actividad', ActividadSchema);