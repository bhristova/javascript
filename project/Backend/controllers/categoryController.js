const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

categoryController = () => {
    const tableName = 'L_category';
    const queriesInstance = query();
    const queryFactoryInstance = queryFactory(tableName);

    return {
        getAll: async (req, res) => {
            const periodId = req.query ? req.query.periodId : '';
            try {
                const options = {
                    select: [{
                        what: 'lc.*'
                    }],
                    tableName: `${tableName} as lc`,
                    ordering: 'asc',
                    orderBy: 'name',
                    filter: [
						{
							column: 'lc.userId',
							op: 'in',
							value: `('${req.user.id}', '891d4021-a697-4d14-9772-d684fe239f6b')`
						},
                        
					],
                };

                if (periodId) {
                    options.filter.push({
                        exists: true,
                        existsCondition: {
                            select: [{
                                    what: '1'
                                }],
                            tableName: 'period_l_category plc',
                            filter: [
                                {
                                    column: 'plc.id1_period',
                                    op: '=',
                                    value: `'${periodId}'`
                                },
                                {
                                    column: 'plc.id2_l_category',
                                    op: '=',
                                    value: 'lc.id'
                                }
                            ]
                        }
                    });
                }

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
                const query = queryFactoryInstance.queryCreate({...req.body[0], userId: req.user.id});
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
                const options = {
                    select: [{
                            what: '*'
                        }],
                    tableName: `${tableName} as lc`,
                    filter: [
                        {
                            column: 'id',
                            op: '=',
                            value: `'${req.params.id}'`
                        },
                        {
                            exists: true,
                            existsCondition: {
                                select: [{
                                        what: '1'
                                    }],
                                tableName: 'amountLog a',
                                filter: [
                                    {
                                        column: 'a.category',
                                        op: '=',
                                        value: 'lc.id'
                                    }
                                ]
                            }
                        }
                    ]
                };
                const queryExistingValues = queryFactoryInstance.queryGetAll(options);
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