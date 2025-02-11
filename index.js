//? Añadiremos nuestro servidor, conexión a la base de datos y uniremos el resto de la aplicación

const express = require('express');
const app = express();
const routes = require('./routes/tasksRoutes.js');
require('dotenv').config()
const PORT = 3000;
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

//-------

//* Importamos la conexión de la base de datos a Mongo Atlas.

const { dbConnection } = require('./config/config.js');

dbConnection();

//--------

app.use(express.json());
app.use(express.urlencoded({ extended:true }))

app.use('/', routes);

app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs))

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});