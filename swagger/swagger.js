const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express"); // Implementar swagger-ui-express

// Metadata acerca de nuestra API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Estas APIs Manejaran la gestion de cursos y usuarios",
      version: "1.0.0",
      description: "Documentacion de la API de Cursos y Usuarios",
      contact: {
        name: "Sebastian Pinzon Reyes",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

// Documentacion en formato JSON
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Asegúrate de que la función acepte 'app' como argumento
module.exports = function(app) {
    // Configuración de Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    // ... resto del código ...
};