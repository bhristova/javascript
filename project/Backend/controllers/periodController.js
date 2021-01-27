const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

periodController = () => {
    const tableName = 'Period';
    const queriesInstance = query();
    const queryFactoryInstance = queryFactory(tableName);

    return {
        getAll: (req, res) => {
            try {
                const options = {
                    select: {
                        what: '*'
                    },
                    tableName: tableName,
                    ordering: 'asc',
                    orderBy: 'startDate'
                };

                const query = queryFactoryInstance.queryGetAll(options);
                const result = queriesInstance.executeQuery(query);
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
                const periodData = { id: req.body.id, budget: req.body.budget, startDate: req.body.startDate, endDate: req.body.endDate };
                const query = queryFactoryInstance.queryCreate(periodData);
                await queriesInstance.executeQuery(query);

                // TODO: why did I think I need a bridge table???
                // const bridgeTableQuery = queryFactoryInstance.queryCreateBridge(req.body.id, 'l_category', req.body.categories);
                // await queriesInstance.executeQuery(bridgeTableQuery);

                res.status(200).send({ message: 'OK' });
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
                const query = queryFactoryInstance.queryDelete(req);
                const result = queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
    }
}

module.exports = periodController;