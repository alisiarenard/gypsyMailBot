import {Dialect, Sequelize} from 'sequelize';

export const config = {
    botToken: "6136046432:AAF7Pd_zN7WQdR2FEWUkgHG-_8Eo1Cz-x9E",
    database: "postgres",
    username: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
}

export const db = new Sequelize(config.database, config.username, config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect as Dialect
    }
);

