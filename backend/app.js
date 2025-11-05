const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/ventas', require('./src/routes/ventas.routes'));

// Servidor
app.listen(app.get('port'), () => {
  console.log(`✅ Servidor corriendo en puerto ${app.get('port')}`);
});
