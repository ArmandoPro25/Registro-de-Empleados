const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const empleadoRoutes = require('./routes/empleadoRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes');
const parentescoRoutes = require('./routes/parentescoRoutes');
const puestoRoutes = require('./routes/puestoRoutes');
const actividadRoutes = require('./routes/actividadRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); //se utiliza para poder subir las imagenes

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/empleados')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


// Usar rutas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/parentescos', parentescoRoutes);
app.use('/api/puestos', puestoRoutes);
app.use('/api/actividades', actividadRoutes);

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});