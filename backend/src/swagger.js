const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const definition = {
  openapi: "3.0.0",
  info: {
    title: "API do Manual da Obra",
    version: "1.0.0",
    description: "Documentação da API"
  },
  servers: [
    {
      url: process.env.API_URL
    }
  ]
};

const options = {
  definition,
  apis: ["./src/controllers/*.js", "./src/models/*.js"]
};

/**
 * @param {express}
 */

const setup = app => app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));

module.exports = setup;