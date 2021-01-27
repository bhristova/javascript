const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

categoryController = () => {
    const tableName = 'L_category';
    const queriesInstance = query();
    const queryFactoryInstance = queryFactory(tableName);

    return {
        getAll: async (req, res) => {
            try {
                const options = {
                    select: {
                        what: '*'
                    },
                    tableName: tableName,
                    ordering: 'asc',
                    orderBy: 'name'
                };

                const query = queryFactoryInstance.queryGetAll(options);

                const result = await queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
        getById: async (req, res) => {
            try {
                const query = queryFactoryInstance.queryGetById(req);
                const result = queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
        create: async (req, res) => {
            try {
                const query = queryFactoryInstance.queryCreate(req.body);
                const result = await queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            }
        },
        update: async (req, res) => {
            try {
                const query = queryFactoryInstance.queryUpdate(req);
                const result = queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
        delete: async (req, res) => {
            try {
                const conditions = { alias: 'lc', exists: `AND EXISTS (SELECT 1 FROM amountLog a WHERE a.category = lc.id)` };
                const queryExistingValues = queryFactoryInstance.queryGetById(req, conditions);
                const existingValues = await queriesInstance.executeQuery(queryExistingValues);
                if (existingValues.length > 0) {
                    const message = `This category is being referenced and cannot be deleted!`;
                    res.status(403).send({ message: message });
                    return;
                } else {
                    const query = queryFactoryInstance.queryDelete(req);
                    const result = await queriesInstance.executeQuery(query);
                    res.status(200).send(result);
                }
            } catch (err) {
                res.status(500).send(err);
            }
        }
    }
}

module.exports = categoryController;