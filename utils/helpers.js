module.exports = {
    format_time: (date) => {
        // return date.toLocalTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}.${new Date(date).getDate()}.${new Date(date).getFullYear()}  ${new Date(date).getHours().toString().padStart(2, '0')}.${new Date(date).getMinutes().toString().padStart(2, '0')}.${new Date(date).getSeconds().toString().padStart(2, '0')}`;
    },
};