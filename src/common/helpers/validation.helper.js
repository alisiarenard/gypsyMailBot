const cities = require("../../dictionary/cities.dictionary");

exports.isValidInput = (text) => /[а-яА-ЯЁё,-]+\s[а-яА-ЯЁё,-]+/.test(text) && text.includes(',');
exports.isValidCity = (cityName) => cities.city.filter((city) => city.name.toLowerCase() === cityName.trim().toLowerCase()).length !==0;
exports.isValidFormatDate = (date) => /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/.test(date);

exports.getFrom = (item, divider = ',') => item.split(divider)[0]?.trim();
exports.getTo = (item, divider = ',') => item.split(divider)[1]?.trim();
exports.getDate = (date) => {
    const splitDate = date.split(".");
    return new Date(new Date(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]))
};