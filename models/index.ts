import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import _ from "lodash";
import Persona from "./Persona"

const db = {};

// Crear base de datos si no existe
export async function sync(config: Config) {
    try {
        await createDatabase(config);

        // Configurar Sequelize con la base de datos
        const sequelize = new Sequelize(
            config.database,
            config.user,
            config.password,
            {
                host: config.host,
                dialect: 'mysql'
            }
        );

        Persona(sequelize);

        await sequelize.authenticate();
        await sequelize.sync();

        _.merge(db, sequelize.models);

    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error;
    }
}

async function createDatabase(config: Config) {
    // Crear conexión sin especificar la base de datos
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password
    });

    // Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
    await connection.end();
}

export default db as Models;

/**
 * Types
 */

type Models = Sequelize["models"]

interface Config {
    host: string;
    user: string;
    password: string;
    database: string;
}