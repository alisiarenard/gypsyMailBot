const {Markup} = require("telegraf");

const BACK = '⬅️ В начало';
const SUBSCRIBE = 'Подписаться';
const NEW_ROUTE = 'Новый маршрут';
const SHARE_PHONE = 'Поделись контактом';
const DOCS = 'Документы';
const DOCS_BAGGAGE = 'Документы и/или багаж';
const FREE = 'Бесплатно';
const NO_COMMENTS = 'Без комментария';
const DELETE_SUBSCRIPTION = 'Удалить подписку';
const DELETE_TRIP = 'Удалить поездку';
const SEE_ALL_ROUTES = 'Посмотреть все маршруты';
const GET_TRIPS = "Я ХОЧУ передать";
const SAVE_TRIP = "Я МОГУ передать";
const USE_USERNAME = 'Использовать username';

const MAIN_MENU = Markup.keyboard([[GET_TRIPS, SAVE_TRIP], [DELETE_SUBSCRIPTION, DELETE_TRIP], [SEE_ALL_ROUTES]]).resize().oneTime();
const NO_AVAILABLE_ROUTES = Markup.keyboard([SUBSCRIBE, NEW_ROUTE, BACK]).oneTime().resize();
const BACK_MENU = Markup.keyboard([BACK]).resize().oneTime();
const SHARE_PHONE_MENU = Markup.keyboard([[Markup.button.contactRequest(SHARE_PHONE)], [BACK]]).oneTime().resize();
const SHARE_CONTACT_MENU = Markup.keyboard([[Markup.button.contactRequest(SHARE_PHONE)], [USE_USERNAME], [BACK]]).oneTime().resize();
const PARCEL_TYPE_MENU = Markup.keyboard([DOCS, DOCS_BAGGAGE, BACK]);
const COST_MENU = Markup.keyboard([FREE, BACK]);
const COMMENT_MENU = Markup.keyboard([NO_COMMENTS, BACK])

module.exports = {
    BACK,
    SUBSCRIBE,
    NEW_ROUTE,
    USE_USERNAME,
    MAIN_MENU,
    BACK_MENU,
    NO_AVAILABLE_ROUTES,
    SHARE_PHONE_MENU,
    PARCEL_TYPE_MENU,
    COST_MENU,
    COMMENT_MENU,
    SHARE_CONTACT_MENU
}