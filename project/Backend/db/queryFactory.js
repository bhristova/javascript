///TODO: refactor this... it's very ugly
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
    let resultColumns = '(';
    if(!Array.isArray(body)) {
        body = [body];
    }

    const columnNames = Object.keys(body[0]);

    columnNames.forEach((column, index) => {
        resultColumns = `${resultColumns} ${column} ${index < columnNames.length - 1 ? ',' : ''}`;
    });
    resultColumns = `${resultColumns})`;

    body.forEach((value, valuesIndex) => {
        resultValues = `${resultValues} (`;

        columnNames.forEach((column, index) => {
            resultValues = `${resultValues} ${getFieldFormatting(value[column])} ${index < columnNames.length - 1 ? ',' : ''}`;
        });

        resultValues = `${resultValues})${valuesIndex < body.length - 1 ? ', ': ''}`;
    });

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

    if(options.union) {
        return `(${parseOptions(options.union[0])}) union (${parseOptions(options.union[1])})`
    }

    let query = `SELECT \
${options.select.operation ? options.select.operation + '(' : ''}\
${options.select.what ? options.select.what : ' * '}\
${options.select.operation ? ')' : ''}\
${options.select.alias ? ' as ' + options.select.alias : ''}\
 FROM `;
    
    if(options.tableName) {
        query = `${query} ${options.tableName}` ;
    } else {
        query = `${query} (${parseOptions(options.from)})` ;
    }

    if(options.filter) {
        options.filter.map((rule, index) => {
            query = `${query} ${index === 0 ? 'WHERE ' : 'AND '}`;
            query = `${query} ${rule.column} ${rule.op}`;
            if(typeof rule.value === 'string') {
                query = `${query} ${rule.value}`;
            } else {
                query = `${query} (${parseOptions(rule.value)})`;
            }

        });
    }

    if(options.alias) {
        query = `${query} as ${options.alias}`;
    }

    if(options.ordering) {
        query = `${query} ORDER BY ${options.orderBy} ${options.ordering}`;
    }

    if(options.top) {
        query = `${query} LIMIT ${options.top}`;
    }

    if(options.specialRule) {
        query = `(${query}) ${options.specialRule}`;
    }

    return query;
}

const queryFactory = (tableName) => {
    return {
        queryGetAll: (options) => parseOptions(options),
        queryGetById: (request, conditions) => {
            const id = {
                column: 'id',
                operation: '=',
                value: request.params.id
            }

            const filterId = parseRule(id);

            let query = `SELECT * FROM ${tableName} ${conditions.alias || ''} ${filterId} ${conditions.exists || ''}`;

            return query;
        },
        queryCreate: (data) => parseInsert(data, tableName),
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
        },
        queryCreateBridge: (id1, tableName2, data2) => {
            const id2 = `id2_${tableName2}`;
            const data = data2.map(elem => ({id1_period: id1, [id2]: elem.id, expectedAmount: elem.value || 0}));
            const bridgeTableName = `${tableName}_${tableName2}`;
            
            return parseInsert(data, bridgeTableName);
        }
    };
}

module.exports = queryFactory;