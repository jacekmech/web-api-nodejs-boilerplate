const logger = require('winston');

const DbSession = require('./DbSession');

const createDbSession = async (connectionSpec) => {

    const dbSession = new DbSession(connectionSpec);
    await dbSession.start();
    logger.debug('Database session created');
    return dbSession;
};

module.exports = createDbSession;
