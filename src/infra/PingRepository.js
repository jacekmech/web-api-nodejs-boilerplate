class PingRepository {

    constructor(knex) {
        this.knex = knex;
    }

    async getDbNow() {
        const result = await this.knex.raw("SELECT DATE('now') as now");
        const rows = result.rows || result;
        return rows[0];
    }
}

module.exports = PingRepository;
