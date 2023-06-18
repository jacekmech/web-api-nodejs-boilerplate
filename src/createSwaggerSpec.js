const swaggerJSDoc = require('swagger-jsdoc');

const createSwaggerSpec = () => {

    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'RESTful API for Web API NodeJS Boilerplate',
            version: '0.1.0',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server',
                basePath: '/api',
            },
        ],
    };

    const options = {
        swaggerDefinition,
        apis: ['./src/**/*.yaml'],
    };

    const swaggerSpec = swaggerJSDoc(options);
    return swaggerSpec;
};

module.exports = createSwaggerSpec;
