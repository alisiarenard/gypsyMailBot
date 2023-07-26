import {db} from "../../connections/db.connection.js";
import TripModel from "../../models/trips.model.js";

export const deleteTrip = (chatId: string, from: string, to: string, date: Date) => {
    return db.sync().then(async () => {
        const subscription = await TripModel.findOne({
            where: {
                chatId: chatId,
                from: from,
                to: to,
                tripDate: date,
                isActive: true
            }
        });

        if (subscription) {
            await subscription.update({
                isActive: false
            });
        }
    });
};