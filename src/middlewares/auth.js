const {Router} = require('express');

const router = Router();

//next() = funcion callback, ejecución progresiva

const validarJSON = (req, res, next, json) => {

    //middleware que comprueba si está recibiendo un tipo JSON o no
    try {
        object = JSON.parse(json);
        console.log('Es un tipo JSON')

    } catch (error) {
        es_json = false;
        console.log("No es tipo JSON");
    }

    next();

}

module.exports = {
    validarJSON,
}