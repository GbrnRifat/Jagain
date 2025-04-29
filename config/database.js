import { Sequelize } from "sequelize";

const db = new Sequelize('dblogin', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;

