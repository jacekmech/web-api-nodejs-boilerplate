const PingRepository = require('./PingRepository');

const createRepositories = ({ db }) => {
    return { pingRepository: new PingRepository(db) };
};

module.exports = createRepositories;
