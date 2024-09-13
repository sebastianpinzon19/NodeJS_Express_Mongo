const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors'); // Asegúrate de importar cors

const cursos = require('./routes/cursos_routes'); // Importa las rutas desde el archivo cursos_routes
const usuarios = require('./routes/usuarios_routes'); // Importa las rutas desde el archivo usuarios_routes

// Conexión a la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/userscoursesdb')
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar swagger-ui
const swaggerUi = require('swagger-ui-express'); // Importar swagger-ui
const swaggerSpec = require('./swagger/swagger.js'); // Asegúrate de tener un archivo swagger.json

// Cargar certificados SSL/TLS
const privateKey = fs.readFileSync('./ssl/privatekey.pem', 'utf8');
const certificate = fs.readFileSync('./ssl/certificate.pem', 'utf8');

// Credenciales para HTTPS
const credentials = { key: privateKey, cert: certificate };

// Crear servidor HTTPS
const httpsServer = https.createServer(credentials, app);

const corsOptions = {
    origin: '*', // Permite cualquier dominio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true, // Descomentar si necesitas enviar credenciales
};

//configuracion de swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.swaggerDocs));

// Aplicar las opciones de CORS
app.use(cors(corsOptions));

// Endpoints (rutas)
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos); // Usar el enrutador para las rutas de cursos

const port = process.env.PORT || 3000;
httpsServer.listen(port, () => {
    console.log(`Documentación disponible en https://localhost:${port}/api-docs`);
    console.log(`API REST HTTPS ejecutándose en el puerto ${port}...`);
});