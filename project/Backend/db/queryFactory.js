///TODO: refactor this... it's very ugly
const parseFilter = (filter) => {
    let result = '';
    if(filter.length === 0 ) {
        return result;
    }

    for(let i = 0; i< filter.length; i++) {
        const rule = filter[i];
        result = `${result} ${parseRule(rule, i)}`;
    }

    return result;
}

const parseRule = (rule, index) => {
    let result = '';

    if (index === 0 || !index) {
        result = 'WHERE ';
    } else {
        result = `${result} AND `;
    }

    result = `${result} ${rule.column} ${rule.operation} '${rule.value}'`;
    return result;
}

const getFieldFormatting = (field) => {
    if (typeof field === 'string') {
        return `'${field}'`;
    } if (typeof field === 'number') {
        return `${field}`;
    }

    return field;
}

const parseInsert = (body, tableName) => {
    let queryInsert = `INSERT INTO ${tableName}`;
    let resultValues = '';
    let resultColumns = '';
    if(!Array.isArray(body)) {
        body = [body];
    }

    //TODO: body should only have one element... fix this pls
    for(let i = 0; i< body.length; i++) {
        const value = body[i];
        resultValues = `${resultValues} (`;
        resultColumns = `${resultColumns} (`;

        const valuesArray = Object.keys(value);
        valuesArray.forEach((key, index) => {
            resultValues = `${resultValues} ${getFieldFormatting(value[key])} ${index < valuesArray.length - 1 ? ',' : ''}`;
            resultColumns = `${resultColumns} ${key} ${index < valuesArray.length - 1 ? ',' : ''}`;
        });

        resultValues = `${resultValues})${i < body.length - 1 ? ', ': ''}`;
        resultColumns = `${resultColumns})`;
    }

    return `${queryInsert} ${resultColumns} VALUES ${resultValues}`;
}

const parseUpdate = (body) => {
    let result = '';

    const valuesArray = Object.keys(body);
    valuesArray.forEach((key, index) => {
        result = `${result} ${key}=${getFieldFormatting(body[key])} ${index < valuesArray.length - 1 ? ',' : ''}`;
    });

    return result;
}

const parseOptions = (options) => {
    if(!options) {
        return;
    }

    // let query = '';
    // if (options.lastDate) {
    //     const date = new Date(options.lastDate);
    //     date.setDate(date.getDate() - 1);
    //     const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    //     query = `${query} WHERE date = date('${dateString}')`
    // } else {
    //     query = `${query} WHERE date = (SELECT MAX(date) from amountlog)`
    // }
    let date = {};
    if(options.lastDate) {
        date = new Date(options.lastDate);
    } else {
        date = new Date();
        date.setDate(date.getDate() + 1);
    }
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    const query = `(SELECT * FROM amountLog where date < date('${dateString}') ORDER BY date desc LIMIT ${options.top})\
        union\
        (SELECT * FROM amountLog WHERE date = (SELECT MIN(dt) FROM (SELECT date as dt FROM amountLog where date < date('${dateString}') ORDER BY date desc LIMIT ${options.top}) as dates) ORDER BY date desc)`

    return query;
}

const queryFactory = (tableName) => {
    return {
        queryGetAll: (request, options) => {
            let query = '';//`SELECT * FROM ${tableName}`;

            // if(request.body.filter) {
            //     const queryFilter = parseFilter(request.body.filter);
            //     query = `${query} ${queryFilter}`;
            // }

            if(tableName === "amountLog") {
                if(options) {
                    const queryOptions = parseOptions(options);
                    query = `${query} ${queryOptions}`;
                }
            } else {
                query = `SELECT * FROM ${tableName}`
            }

            return query;
        },
        queryGetById: (request) => {
            const id = {
                column: 'id',
                operation: '=',
                value: request.params.id
            }

            const filterId = parseRule(id);

            let query = `SELECT * FROM ${tableName} ${filterId}`;
            return query;
        },
        queryCreate: (request) => {
            const body = request.body;

            const query = parseInsert(body, tableName);

            return query;
        },
        queryUpdate: (request) => {
            const id = request.params.id;
            const body = request.body

            const values = parseUpdate(body);
            let query = `UPDATE ${tableName} SET ${values} WHERE id=${getFieldFormatting(id)}`;

            return query;
        },
        queryDelete: (request) => {
            const id = request.params.id;

            let query = `DELETE FROM ${tableName} WHERE id=${getFieldFormatting(id)}`;

            return query;
        }
    };
}

module.exports = queryFactory;