const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');
const Actividad = require('../models/actividadModel');


router.post('/', actividadController.crearActividad);
router.get('/', actividadController.obtenerActividades);
router.put('/:id', actividadController.actualizarActividad);
router.delete('/:id', actividadController.eliminarActividad);

router.get('/:id', async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id);
        if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
        res.json(actividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;