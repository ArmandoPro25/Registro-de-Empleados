const mongoose = require('mongoose');

const DepartamentoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    }
});

module.exports = mongoose.model('Departamento', DepartamentoSchema);