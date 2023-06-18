require('dotenv').config();

const createDefaultLogger = require('./createDefaultLogger');
const createServer = require('./createServer');

const logger = createDefaultLogger();

['unhandledRejection', 'uncaughtException'].forEach((event) => {
    process.on(event, (error) => {
        logger.error('Uncaught exception');
        logger.error(error);
        if (error.stack) {
            logger.error(error.stack);
        }
    });
});

const start = async () => {

    const port = process.env.PORT || '8080';
    const { httpServer } = await createServer();
    httpServer.listen(port, () => {

        const allowedEnvs = ['development', 'testing', 'staging', 'production'];
        const environment = process.env.NODE_ENV || 'production';
        if (!allowedEnvs.includes(environment)) {
            logger.error(`NODE_ENV is set to ${environment} which is not supported.`);
            process.exit(1);
        } else {
            logger.info(`Server started and listening on port ${port}`);
        }
    });
};

start();
