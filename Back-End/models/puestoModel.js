const mongoose = require('mongoose');

const PuestoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    }
});

module.exports = mongoose.model('Puesto', PuestoSchema);