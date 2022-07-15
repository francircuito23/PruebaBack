//requerimos express
const express = require('express');

//requerimos nuestro router
const router = require('../src/routes/api');

//llamamos a express
const app = express();

//requerimos body-parser para los jsons
const bodyParser  = require('body-parser');

//middleware para parsear todas las solicitudes
app.use(bodyParser.json())

//middleware que comprueba que las peticiones de la api reciba jsons
app.use(express.json());

//router específico para cada una de las rutas del fichero api.js
app.use('/api', router);

//constante que guarda el puerto
const PUERTO = 5003;

//Iniciando el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor conectado al puerto ${PUERTO}`);
});