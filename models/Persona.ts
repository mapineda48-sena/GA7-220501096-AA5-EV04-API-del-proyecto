import { Sequelize, DataTypes } from "sequelize";

export default function define(sequelize: Sequelize) {
    sequelize.define('Persona', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        // Opciones adicionales
        tableName: 'Personas'
    })
}

export interface IPersona {
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: Date
}