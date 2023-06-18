const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const createContextInfra = require('./createContextInfra');
const createControllers = require('./createControllers');
const createRouter = require('./createRouter');
const createSwaggerSpec = require('./createSwaggerSpec');

const createServer = async () => {

    const app = express();

    app.disable('etag');

    app.use(cors({
        exposedHeaders: ['Content-Range', 'Content-Disposition'],
    }));

    app.use(helmet({
        dnsPrefetchControl: false,
        frameguard: false,
        ieNoOpen: false,
    }));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json(
        { type: ['application/vnd.api+json', 'application/json'] },
    ));

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(createSwaggerSpec()));

    const infraContext = await createContextInfra();
    const controllers = createControllers(infraContext);
    const router = createRouter(controllers);
    app.use(router);

    const httpServer = http.Server(app);
    return {
        httpServer,
        ...infraContext,
    };
};

module.exports = createServer;
