const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

// Ruta POST para recibir el formulario de ubicación (si vas a guardar esos datos)
router.post('/registro-ubicacion', (req, res) => {
    const { nombre, latitud, longitud, fechaHora } = req.body;
  
    console.log('Datos de ubicación recibidos:', { nombre, latitud, longitud, fechaHora });
  
    // Guardar datos en la sesión temporalmente
    req.session.ubicacion = { nombre, latitud, longitud, fechaHora };
  
    // Redirigir a la vista de sorpresa
    res.redirect('/sorpresa');
  });

  router.get('/sorpresa', (req, res) => {
    res.render('sorpresa1');
});




module.exports = router;
