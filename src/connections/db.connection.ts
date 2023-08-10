import {Dialect, Sequelize} from 'sequelize';
// @ts-ignore
import {conf} from "../../conf.js";

export const db = new Sequelize(conf.database, conf.username, conf.password,
    {
        host: conf.host,
        port: conf.port,
        dialect: conf.dialect as Dialect
    }
);

