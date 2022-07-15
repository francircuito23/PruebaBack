//requerimos express para la función
const { request, response } = require('express');
  

const getFamilia = (req = request, res = response) => {

    //para el get lo que he hecho es guardar en un array todos los objetos
    const familia = [{
        abuelo: {
            numserie: 9999,
            tipo_dispositivo: 3,
            id_padre: null,
            id_abuelo: null
        },
        padres: [
            {numserie: 8888, tipo_dispositivo: 2, id_padre: null, id_abuelo: 9999},
            {numserie: 7777, tipo_dispositivo: 2, id_padre: null, id_abuelo: 9999}
        ],
        hijos: [
            {numserie: 6666, tipo_dispositivo: 1, id_padre: 7777, id_abuelo: null},
            {numserie: 5555, tipo_dispositivo: 1, id_padre: 8888, id_abuelo: null},
            {numserie: 4444, tipo_dispositivo: 1, id_padre: 7777, id_abuelo: null}
        ]
    }]

    //posteriormente he creado un nuevo array de objetos donde voy a guardar todos los datos del primero
    const newFamilia = [{abuelo:{
        padres:{
            hijos:{

            }
        }
    }}];

    //relleno mediante for-in los datos del primer array en el segundo para poder obtener la estructura de árbol

    for (key in familia[0].abuelo) { 
        newFamilia[0].abuelo = familia[0].abuelo; 
    }

    for (key in familia[0].padres) { 
        newFamilia[0].abuelo.padres = familia[0].padres; 
    }

    for (key in familia[0].hijos) { 
        newFamilia[0].abuelo.padres.hijos = familia[0].hijos; 
    }

    //para la petición devuelvo el array de objetos en formato JSON
    res.json({
        newFamilia
    });

}

//Exportamos la función para poder usarla en nuestras rutas
module.exports.getFamilia = getFamilia;