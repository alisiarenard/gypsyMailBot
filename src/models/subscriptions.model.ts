
import {db} from "../connections/db.connection.js";
import  { DataTypes } from "sequelize";

const SubscriptionsModel = db.define("subscription", {
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
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

export default SubscriptionsModel;