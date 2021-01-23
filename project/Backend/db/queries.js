const { getDb } = require('./db');

const queries = (tableName) => {
    const collectionName = tableName;
    return {
        get: async (query) => {
            try {
                const db = getDb();
                const collection = db.collection(collectionName);
                const result = await collection.find(query);
                return result;
            } catch (err) {
                //err handle
            }
        },
    }
};

module.exports = queries;
