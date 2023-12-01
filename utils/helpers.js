module.exports = {
    format_time: (date) => {
        return date.toLocalTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            // We add five years to the 'year' value to calculate the end date
            new Date(date).getFullYear()}`
    },
};