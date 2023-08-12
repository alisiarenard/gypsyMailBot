import moment from "moment/moment.js";
import {startAction} from '../../middleware/actions/start.action.js';

export function getInvalidDirectionMessage(fromIsValid: boolean, toIsValid: boolean, isDiffCities: boolean): string {
    const direction = !fromIsValid && toIsValid ? 'отправления' : !toIsValid && fromIsValid ? 'назначения' : 'отправления и назначения';

    return isDiffCities ? `Ты указал несуществующий город ${direction}. Укажи маршрут в формате Город отправления Город назначения, например, Москва, Белград` : 'Город отправления должен отличаться от города назначения';
}

export function getTripMessage(trip: any) {
    const href = `https://t.me/${trip.username}`;
    console.log('dddd', href);
    const contact = Array.from(trip.username)[0] === '+' ? href : '@' + trip.username;
    const comment = trip.comment === 'Без комментария' ? '' : `\nКомментарий: ${trip.comment}`;
    const formatDate = moment(trip.tripDate).format('DD.MM.yyyy');

    return `Контакт: ${contact}\nДата: ${formatDate}\nМожет передать: ${trip.parcelType}\nСтоимость: ${trip.cost}${comment}`;
}

export async function backToStart(ctx: any) {
    await ctx.scene.leave();
    await ctx.reply('Предыдущая сессия завершена');
    await startAction(ctx);

}