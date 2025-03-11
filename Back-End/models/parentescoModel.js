const mongoose = require('mongoose');

const ParentescoSchema = new mongoose.Schema({
    parentesco: {
        type: String,
        required: [true, 'El parentesco es obligatorio'],
        trim: true
    }
});

module.exports = mongoose.model('Parentesco', ParentescoSchema);