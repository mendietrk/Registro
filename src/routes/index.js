const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ubicacion = require("../models/ubicacion.js");

// Ruta GET para mostrar formulario de conexión
router.get('/', (req, res) => {
  res.render('home'); // Asegúrate de tener views/conexion.ejs
});

// POST /db/submit: conectar a MongoDB y redirigir al formulario de ubicación
router.post('/db/submit', async (req, res) => {
  if (!req.body || !req.body.db1) {
    return res.status(400).json({
      success: false,
      message: 'Datos incompletos',
    });
  }

  const URI = `mongodb+srv://${req.body.db1}:JLqfp91zOg8yjP2A@cluster0.lnpsbzn.mongodb.net/rapqp2?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
    });

    // Respuesta JSON con instrucción de redirección
    return res.json({ success: true, redirectTo: '/registro-ubicacion' });

  } catch (error) {
    console.error('Error MongoDB:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Ruta GET para mostrar el formulario de ubicación
router.get('/registro-ubicacion', (req, res) => {
  res.render('ubicacion'); // Asegúrate de tener views/registro-ubicacion.ejs
});

router.post('/registro-ubicacion', async (req, res) => {
  try {
    const { nombre, latitud, longitud, fechaHora } = req.body;

    await Ubicacion.create({
      nombre,
      latitud: parseFloat(latitud),
      longitud: parseFloat(longitud),
      fechaHora: new Date(fechaHora),
    });

    // Puedes elegir redirigir o enviar respuesta, pero no ambas
    res.redirect('/sorpresa'); // ✅ Recomendado si usas una vista
    // res.send('Ubicación registrada exitosamente'); // ❌ No usar ambas
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar la ubicación');
  }
});

  router.get('/sorpresa', (req, res) => {
    res.render('sorpresa1');
});




module.exports = router;
