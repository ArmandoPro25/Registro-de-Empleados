const Empleado = require('../models/empleadoModel');
const { generarClave, generarRFC } = require('../utils/generadores');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Los archivos se guardan en la carpeta "uploads"
    },
    filename: (req, file, cb) => {
        // Obtener el nombre del empleado
        const { Nombres, ApellidoPaterno, ApellidoMaterno } = req.body;

        // Genera un nombre de archivo
        const nombreArchivo = `${Nombres}-${ApellidoPaterno}-${ApellidoMaterno}${path.extname(file.originalname)}`;

        // Reemplaza espacios y caracteres especiales
        const nombreArchivoLimpio = nombreArchivo
            .normalize('NFD') // Quita acentos
            .replace(/\s+/g, '-')
            .replace(/[^\w.-]/g, '')
            .toLowerCase();

        cb(null, nombreArchivoLimpio); // Guarda el archivo con el nombre personalizado
    }
});

const upload = multer({ storage }).single('FotoEmpleado');

exports.crearEmpleado = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { Nombres, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Contrasena, ...resto } = req.body;
        const clave = await generarClave(Nombres, ApellidoPaterno, ApellidoMaterno);
        const rfc = generarRFC(ApellidoPaterno, ApellidoMaterno, Nombres, new Date(FechaNacimiento));

        const empleado = new Empleado({
            _id: clave,
            NombreEmpleado: { Nombres, ApellidoPaterno, ApellidoMaterno },
            RFC: rfc,
            FotoEmpleado: req.file ? req.file.path : null,
            Contrasena: Contrasena,
            ...resto
        });

        await empleado.save();
        res.status(201).json(empleado);
    });
};

exports.obtenerEmpleados = async (req, res) => {
    const empleados = await Empleado.find();
    res.json(empleados);
};

exports.actualizarEmpleado = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        try {
            const updates = req.body;
            // Solo actualiza la imagen si se sube un archivo nuevo
            if (req.file) {
                updates.FotoEmpleado = req.file.path;
            }

            // Actualiza el empleado
            const empleado = await Empleado.findByIdAndUpdate(
                req.params.id,
                { $set: updates },
                { new: true, runValidators: true }
            );

            res.json(empleado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

exports.eliminarEmpleado = async (req, res) => {
    await Empleado.findByIdAndDelete(req.params.id);
    res.status(204).send();
};

exports.autenticarEmpleado = async (req, res) => {
    const { Contrasena, _id } = req.body;

    try {
        const empleado = await Empleado.findOne({ _id: _id }).select('+Contrasena');
        if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });

        if (Contrasena !== empleado.Contrasena) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        console.log('Acceso correcto de', empleado.NombreEmpleado.Nombres);

        const token = jwt.sign(
            { id: empleado._id, rol: empleado.Rol },
            'clave-muy-secreta-muy-larga-como-mi-v12345',
            { expiresIn: '1h' }
        );

        res.json({ token, empleado });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};