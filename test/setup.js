const createDefaultLogger = require('../src/createDefaultLogger');
const createServer = require('../src/createServer');

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

let dbSession;

const beforeAction = async () => {

    try {
        const server = await createServer();
        dbSession = server.dbSession;
        return server;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const afterAction = async () => {
    await dbSession.stop();
};

module.exports = { beforeAction, afterAction };
