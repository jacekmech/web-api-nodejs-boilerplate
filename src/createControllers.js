const { wrapWith500Reporter } = require('./libs/http/errorReporterWrappers');

const createDefaultControllers = require('./controllers/createDefaultControllers');

const createControllers = (infraCtx) => {
    const controllers = createDefaultControllers(infraCtx);
    return wrapWith500Reporter(controllers);
};

module.exports = createControllers;
