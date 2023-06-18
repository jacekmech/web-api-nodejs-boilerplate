const createDbConnSpec = require('./createDbConnSpec');

const createDbSession = require('./libs/createDbSession');
const createDefaultContext = require('./infra/createDefaultContext');

const createContextInfra = async () => {

    const dbConnSpec = createDbConnSpec();
    const dbSession = await createDbSession(dbConnSpec);
    const infraCtx = createDefaultContext(dbSession);
    return { dbSession, ...infraCtx };
};

module.exports = createContextInfra;
