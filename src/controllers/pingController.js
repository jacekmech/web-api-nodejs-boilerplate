const { query } = require('express-validator');

const Endpoint = require('../libs/http/Endpoint');
const handleApiErrors = require('../libs/http/handleApiErrors');

class PingGetEndpoint extends Endpoint {

    constructor(pingRepository) {
        super();
        this.pingRepository = pingRepository;
    }

    getMethod() {
        return 'GET';
    }

    getPath() {
        return '/api/public/ping';
    }

    getValidators() {
        return [
            query('callerName', 'callerName not specified').notEmpty().isString(),
        ];
    }

    async execute(req, res) {

        if (!handleApiErrors(req, res)) {
            return;
        }

        const { callerName } = req.query;
        const record = await this.pingRepository.getDbNow();
        res.send(`Pong at ${record.now} for ${callerName}`);
    }
}

const pingController = (pingRepository) => {

    return [
        new PingGetEndpoint(pingRepository),
    ];
};

module.exports = pingController;
