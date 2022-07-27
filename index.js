var express = require('express');
require ('dotenv').config(); //env son las variables de entorno
const cors = require('cors');
const {dbConnection}=require('./database/config')
//console.log(process.env);

//cear el servidor de express
var app = express();

//base de datos
dbConnection();

//CORS
app.use(cors());

//crear directorio publico
app.use(express.static('public')); //use → es una peticion midelwere que se ejecuta cuando alguien hace una peticion al servidor

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));


//TODO: CRUD : EVENTOS



//escuchar peticiones
app.listen(process.env.PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.PORT);
})