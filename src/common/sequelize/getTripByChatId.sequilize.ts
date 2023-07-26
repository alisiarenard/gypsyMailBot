import {db} from "../../connections/db.connection.js";
import TripModel from "../../models/trips.model.js";

export const getTripByChatId = async (chatId: string) => {
    return db.sync().then(async () => {
        const trips = await TripModel.findAll({
            where: {
                chatId: chatId,
                isActive: true
            },
            order: [['tripDate', 'DESC']]});

        return trips;
    });
};