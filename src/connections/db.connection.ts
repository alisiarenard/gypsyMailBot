import {Dialect, Sequelize} from 'sequelize';
import {config} from "../config.js";

export const db = new Sequelize(config.database, config.username, config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect as Dialect
    }
);

