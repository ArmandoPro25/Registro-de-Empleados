const mongoose = require('mongoose');

const ActividadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    }
});

module.exports = mongoose.model('Actividad', ActividadSchema);