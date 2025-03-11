const express = require('express');
const router = express.Router();
const puestoController = require('../controllers/puestoController');
const Puesto = require('../models/puestoModel');


router.post('/', puestoController.crearPuesto);
router.get('/', puestoController.obtenerPuestos);
router.put('/:id', puestoController.actualizarPuesto);
router.delete('/:id', puestoController.eliminarPuesto);

router.get('/:id', async (req, res) => {
    try {
        const puesto = await Puesto.findById(req.params.id);
        if (!puesto) return res.status(404).json({ error: 'Puesto no encontrado' });
        res.json(puesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;