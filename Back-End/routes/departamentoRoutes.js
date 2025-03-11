const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');
const Departamento = require('../models/departamentoModel');


router.post('/', departamentoController.crearDepartamento);
router.get('/', departamentoController.obtenerDepartamentos);
router.put('/:id', departamentoController.actualizarDepartamento);
router.delete('/:id', departamentoController.eliminarDepartamento);

router.get('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findById(req.params.id);
        if (!departamento) return res.status(404).json({ error: 'Departamento no encontrado' });
        res.json(departamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;