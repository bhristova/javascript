const { getDb } = require('./db');

const query = () => {
    return {
        executeQuery: (query) => {
            const db = getDb();
            return new Promise((resolve, reject) => {
                db.query(query, (err, rows, fields) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(rows);
                });
            });
        }
    }
};

module.exports = query;
