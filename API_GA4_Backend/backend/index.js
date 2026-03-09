const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./database');

const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());

// Configuración CORS (solo una vez)
app.use(cors({
  origin: 'http://localhost:3001', // React corre aquí
  credentials: true
}));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/servicios', require('./routes/servicios.routes'));

// Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor activo en el puerto', app.get('port'));
});