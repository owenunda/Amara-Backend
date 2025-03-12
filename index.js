const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./database');
const routes = require('./routes');

// Middleware para parsear JSON
app.use(express.json());

//Middleware para usar cors
app.use(cors());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Usar las rutas definidas
app.use('/api', routes);



// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});