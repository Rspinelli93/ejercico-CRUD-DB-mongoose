//? Añadiremos nuestro servidor, conexión a la base de datos y uniremos el resto de la aplicación

const express = require('express');
const app = express();
/* const routes = require('./routes'); */
const PORT = 3000;

//-------
//! Importamos la conexión de la base de datos a Mongo Atlas.

const { dbConnection } = require('./config/config');

dbConnection();

//--------

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});