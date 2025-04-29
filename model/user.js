import { Sequelize } from "sequelize";  
import db from "../config/database.js";

const { DataTypes } = Sequelize; 

const Users = db.define('users', {}, {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    validate:{
            len:{
                args: [6, 20],
                msg: "Password must be between 6 and 20 characters"
            }
        }
    },
    refresh_token:{
        type: DataTypes.TEXT
    },  

},{
    freezetableName: true,
    timestamps: false,
    tableName: 'users',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

});

export default Users;   

