
const express = require('express');
const app = express();
const inscripcionRouter = require('./routes/inscripcion.router');
const tipoActividadRouter = require('./routes/tipoActividad.router');
const actividadRouter = require('./routes/actividad.router');
const cors = require('cors');
app.get('/', (req, res) => {
  res.send('Servidor Funcionando');
});

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use('/reserve', inscripcionRouter);

app
  .use('/actividad', actividadRouter)
  .use('/inscripcion', inscripcionRouter)
  .use('/tipoActividad', tipoActividadRouter);


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});