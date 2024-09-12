const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.js"],
};

// Dcoumentacion en formato JSON
const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = { swaggerDocs };