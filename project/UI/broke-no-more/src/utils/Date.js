export const areDatesEqual = (log1, log2) => {
    const date1 = new Date(log1);
    let date2 = new Date();

    if(log2) {
        date2 = new Date(log2);
    }

    return date1.getDate()     === date2.getDate()
        && date1.getMonth()    === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear();
};

export const isDateEarlierOrEqual = (log1, log2) => {
    const date1 = new Date(log1);
    let date2 = new Date();

    if(log2) {
        date2 = new Date(log2);
    }

    if (date1.getFullYear() < date2.getFullYear()) {
        return true;
    }
    if( date1.getMonth() < date2.getMonth()) {
        return true;
    }

    return date1.getDate() <= date2.getDate();
}