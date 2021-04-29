import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'API do Manual da Obra',
    version: '1.0.0',
    description:
      'Documentação da API (apenas para auxiliar no desenvolvimento e manutenção)',
  },
  servers: [
    {
      url: process.env.API_URL,
    },
  ],
};

const options = {
  definition,
  apis: ['./src/controllers/*.js', './src/models/*.js'],
};

/**
 * @param {express}
 */

const _setup = (app) => app.use('/api/docs', serve, setup(swaggerJSDoc(options)));

export default _setup;
