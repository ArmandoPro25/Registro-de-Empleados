const express = require('express');
const router = express.Router();
const parentescoController = require('../controllers/parentescoController');
const Parentesco = require('../models/parentescoModel');


router.post('/', parentescoController.crearParentesco);
router.get('/', parentescoController.obtenerParentescos);
router.put('/:id', parentescoController.actualizarParentesco);
router.delete('/:id', parentescoController.eliminarParentesco);

router.get('/:id', async (req, res) => {
    try {
        const parentesco = await Parentesco.findById(req.params.id);
        if (!parentesco) return res.status(404).json({ error: 'Parentesco no encontrado' });
        res.json(parentesco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

