module.exports = {
    format_date: (date) => {
        //date format mm/dd/yyyy
        return date.toLocalDateString();
    },
    format_time: (date) => {
        return date.toLocalTimeString();
    },
};