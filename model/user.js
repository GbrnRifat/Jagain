import { Sequelize } from "sequelize";  
import db from "../config/database.js";

const { DataTypes } = Sequelize; 

const Users = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 20],
                msg: "Password must be between 6 and 20 characters"
            }
        }
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: true, 
    tableName: 'users',
    underscored: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});


export default Users;   

