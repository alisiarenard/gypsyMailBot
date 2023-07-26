import { Sequelize } from'sequelize';

// @ts-ignore
// @ts-ignore
export const db = new Sequelize(
    process.env.POSTGRES_DATABASE as string,
    process.env.POSTGRES_USERNAME as string,
    process.env.POSTGRES_PASSWORDas as string,
    {
        host: process.env.POSTGRES_HOST as string,
        port: 5432,
        dialect: 'postgres'
    }
);

export default db;