import {db} from "../../connections/db.connection.js";
import TripModel from "../../models/trips.model.js";

export const getTripsByChatId = async (chatId: string) => {
    return db.sync().then(async () => {
        const trips = await TripModel.findAll({
            where: {
                chatId: chatId,
                isActive: true
            }});

        return trips;
    });
};