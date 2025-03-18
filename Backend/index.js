const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./src/config/database');
const routes = require('./src/routes/routes');

// Middleware para parsear JSON
app.use(express.json());

//Middleware para usar cors
app.use(cors());



// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.send('El servidor esta corriendo correctamente')
});


// Usar las rutas definidas
app.use('/api', routes);



// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📢 Server is running on port ${PORT}`);
  console.log(`📢 Url: http://localhost:3000`);
});