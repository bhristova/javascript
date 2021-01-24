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

const parseInsert = (body) => {
    let result = '';
    if(!Array.isArray(body)) {
        body = [body];
    }

    for(let i = 0; i< body.length; i++) {
        const value = body[i];
        result = `${result} (`;

        const valuesArray = Object.keys(value);
        valuesArray.forEach((key, index) => {
            result = `${result} ${getFieldFormatting(value[key])} ${index < valuesArray.length - 1 ? ',' : ''}`;
        });

        result = `${result})${i < body.length - 1 ? ', ': ''}`;
    }

    return result;
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

    let query = '';
    if (options.orderBy) {
        query = `ORDER BY ${options.orderBy} ${options.ordering || 'desc'}`;
    }
    if (options.top) {
        query = `${query} LIMIT ${options.top}`
    }

    return query;
}

const queryFactory = (tableName) => {
    return {
        queryGetAll: (request, options) => {
            let query = `SELECT * FROM ${tableName}`;

            if(request.body.filter) {
                const queryFilter = parseFilter(request.body.filter);
                query = `${query} ${queryFilter}`;
            }

            if(options) {
                const queryOptions = parseOptions(options);
                query = `${query} ${queryOptions}`;
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

            const values = parseInsert(body);
            let query = `INSERT INTO ${tableName} VALUES ${values}`;

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