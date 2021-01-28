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
                    select: [{
                        what: '*'
                    }],
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
        getPeriodStatistics: async (req, res) => {
            const periodId = req.params.id;

            try {
                const optionsExpectedAmount = {
					select: [{
						what: 'plc.*',
					}, {
                        what: 'lc.Name'
                    }],
                    tableName: 'period_l_category plc',
                    join: [
                        {
                            type: 'inner',
                            table: 'l_category lc',
                            op: '=',
                            tableProperty: 'lc.id',
                            otherTableProperty: 'plc.id2_l_category'
                        }
                    ],
					filter: [
						{
							column: 'id1_period',
							op: '=',
							value: `'${periodId}'`
						}
					]
                };
                
                const optionsActualAmountPlus = {
					select: [{
                            what: 'al.amount',
                            operation: 'SUM',
                            alias: 'actualSum'
                        }, {
                            what: 'lc.id',
                            alias: 'categoryId'
                        }, {
                            what: 'al.icon',
                        }],
                    tableName: 'amountLog al',
                    join: [
                        {
                            type: 'inner',
                            table: 'l_category lc',
                            op: '=',
                            tableProperty: 'lc.id',
                            otherTableProperty: 'al.category'
                        }
                    ],
					filter: [
						{
							column: 'al.forPeriod',
							op: '=',
							value: `'${periodId}'`
                        },
                        {
							column: 'al.icon',
							op: '=',
							value: `'f07644fb-e299-4436-867b-fb85ddee0440'`
						}
                    ],
                    groupBy: ['lc.id']
                };
                
                ///TODO: change every Object.assign or {...obj} to JSON parse and stringify... evidently that is one of the few ways to deep clone an object...
                const optionsActualAmountMinus = JSON.parse(JSON.stringify(optionsActualAmountPlus));
                optionsActualAmountMinus.filter[1].value = '\'8625aea2-2c79-4d2f-86ac-b4c4c6aa5846\'';

                const queryExpectedAmount = queryFactoryInstance.queryGetAll(optionsExpectedAmount);
                const resultExpectedAmount = await queriesInstance.executeQuery(queryExpectedAmount);
                const budget = resultExpectedAmount.reduce((acc, curr) => {return acc + curr.expectedAmount}, 0);

                const queryActualAmountPlus = queryFactoryInstance.queryGetAll(optionsActualAmountPlus);
                const resultActualAmountPlus = await queriesInstance.executeQuery(queryActualAmountPlus);

                const queryActualAmountMinus = queryFactoryInstance.queryGetAll(optionsActualAmountMinus);
                const resultActualAmountMinus = await queriesInstance.executeQuery(queryActualAmountMinus);

                const result = resultExpectedAmount.map(elem => {
                    const existingAmountPlus = resultActualAmountPlus.find(el => el.categoryId === elem.id2_l_category);
                    const existingAmountMinus = resultActualAmountMinus.find(el => el.categoryId === elem.id2_l_category);
                    let amount = 0;
                    if (existingAmountPlus) {
                        amount = existingAmountPlus.actualSum;
                    }

                    if (existingAmountMinus) {
                        amount -= existingAmountMinus.actualSum;
                    }

                    return ({
                        categoryName: elem.Name,
                        categoryId: elem.id2_l_category, 
                        expectedAmount: elem.expectedAmount, 
                        expectedAmountPercent: elem.expectedAmount/budget * 100,
                        actualAmount: amount,
                        actualAmountPercent: amount/budget * 100,
                    });
                });

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
                // BECAUSE this is the table where we keep the expected amout - the amount the user wants to spend for a certain period on a certain category!
                const bridgeTableQuery = queryFactoryInstance.queryCreateBridge(req.body.id, 'l_category', req.body.categories);
                await queriesInstance.executeQuery(bridgeTableQuery);

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