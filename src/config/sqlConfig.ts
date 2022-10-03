export const sqlConfig = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        pool: {
            idleTimeoutMillis: 30000,
        },
        options: {
            enableArithAbort: true,
            encrypt: false,
        },
    },
};
