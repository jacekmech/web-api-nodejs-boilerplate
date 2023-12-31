const createDbConnSpec = () => {

    return process.env.NODE_ENV !== 'testing' ? {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: 'migrations',
        },
    } : {
        client: 'sqlite3',
        connection: {
            filename: ':memory:',
        },
        useNullAsDefault: true,
    };
};

module.exports = createDbConnSpec;
