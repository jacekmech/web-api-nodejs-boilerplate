const createPingController = require('./pingController');

const createDefaultControllers = ({ pingRepository }) => {
    return [createPingController(pingRepository)];
};

module.exports = createDefaultControllers;
