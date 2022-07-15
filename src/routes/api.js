const {Router} = require('express');

//llamamos a router que será el encargado de nuestros endpoints
const router = Router();

//requerimos jwt
const jwt = require('jsonwebtoken');

//requerimos el controlador
const { getFamilia } = require('../controllers/getFamilia');

//endpoints

//endpoint que llama a la función del controlador que nos devuelve el objeto
router.get('/familia', getFamilia);

//endpoint para generar el token (lo generamos con jwt)
router.get('/generar/token', (req, res, next) => {

    //creo un objeto usuario por ejemplo, para poder generar el token
    const user = {
        id: 1,
        nombre: 'fran',
        edad: 90
    }

    //uso el método sign para que me permita si el objeto creado coincide generar el token para dicho objeto en formato JSON
    jwt.sign({user}, 'llavesecreta', (err, token) => {
        
        res.json({
            token
        })
    });

    next();
});

//función/middleware que verifica que el header se encuentra en la petición

const verificarToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){

        //split para generar solamente el token y así evitar la palabra clave (Bearer)
        const bearerToken = bearerHeader.split(' ')[1];

        req.token = bearerToken;

        next();
    }
    //si no se añade authorization en los headers denegamos el acceso a la petición con el error 403
    else{
        res.sendStatus(403);
    }
}

//endpoint para verificar que existe el token y poder realizar peticiones al servidor

router.get('/verificar/token', verificarToken, (req, res, next) => {
    console.log('ola');

    jwt.verify(req.token, 'llavesecreta', (err, autorizar) => {
        
        if(err){
            res.sendStatus(403) //si no se encuentra el token denegamos el acceso al servidor
        }
        else{
            res.json({
                mensaje: 'dentro',
                autorizar
            });
        }
        
    });

    next();
});

module.exports = router;