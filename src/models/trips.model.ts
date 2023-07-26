import { db } from "../connections/db.connection.js";
import  { DataTypes } from "sequelize";

const TripsModel = db.define("trip", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    chatId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tripDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    parcelType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

export default TripsModel;