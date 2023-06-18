const knex = require('knex');

class DbSession {

    constructor(connectionSpec) {
        this.connectionSpec = connectionSpec;
    }

    async start() {
        this.db = await knex(this.connectionSpec);
        await this.db.migrate.latest();
    }

    async stop() {
        await this.db.destroy();
    }
}

module.exports = DbSession;
