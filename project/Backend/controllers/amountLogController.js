const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

amountLogController = () => {
	const tableName = 'amountLog';
	const queriesInstance = query();
	const queryFactoryInstance = queryFactory(tableName);

	const getAllDates = (startDate, data) => {
		const dates = data.map(elem => elem.date);
		let endDate = dates[0];
		dates.forEach(date => {
			if (date < endDate) {
				endDate = date;
			}
		});

		let result = [];
		let currentDate = new Date(startDate);
		currentDate.setDate(currentDate.getDate() - 1);

		while (endDate <= currentDate) {
			result.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() - 1);
		}

		return result;
	}

	const getParamsFromUrl = (urlParams) => {
		let lastDate = new Date();
		let periodId = '';

		if (urlParams) {
			lastDate = urlParams.get('lastDate');
			periodId = urlParams.get('periodId');
			if (lastDate) {
				lastDate = lastDate.substring(0, lastDate.indexOf('GMT'));
				lastDate = new Date(lastDate);
			}
		}

		return {
			lastDate: `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}`,
			periodId: periodId
		};
	}

	const distributeResults = (dates, result) => {
		const dateResults = dates.map(date => {
			const dateResult = result.filter(elem => {
				const filterDate = new Date(date);
				const currentDate = new Date(elem.date);
				return currentDate.getFullYear() === filterDate.getFullYear() &&
					currentDate.getMonth() === filterDate.getMonth() &&
					currentDate.getDate() === filterDate.getDate();
			});

			if (dateResult.length > 0) {
				return dateResult;
			}

			return [{ date: date }];
		});

		return dateResults;
	}

	return {
		getAll: async (req, res) => {
			try {
				/// get 'top' and 'ordering' options from config maybe? or let user choose these settings?
				const params = new URLSearchParams(req.params[0]);
				const { lastDate, periodId } = getParamsFromUrl(params);

				const optionsFirst = {
					select: {
						what: '*',
					},
					tableName: tableName,
					filter: [
						{
							column: 'date',
							op: '<',
							value: `date('${lastDate}')`
						}, {
							column: 'forPeriod',
							op: '=',
							value: `'${periodId}'`
						}
					],
					top: 15,
					ordering: 'desc',
					orderBy: 'date'
				};

				const optionsSecond = {
					select: {
						what: '*',
					},
					tableName: tableName,
					filter: [{
						column: 'date',
						op: '=',
						value: {
							select: {
								what: 'dt',
								operation: 'MIN'
							},
							from: {
								select: {
									what: 'date',
									alias: 'dt'
								},
								tableName: tableName,
								top: 15,
								orderBy: 'date',
								ordering: 'desc',
								filter: [
									{
										column: 'date',
										op: '<',
										value: `date(${lastDate})`
									}
								],
							},
							alias: 'dates'
						}
					}],
					orderBy: 'date',
					ordering: 'desc'
				};

				const union = { union: [optionsFirst, optionsSecond] };

				const query = queryFactoryInstance.queryGetAll(union);
				const result = await queriesInstance.executeQuery(query);

				const dates = getAllDates(lastDate, result);
				const dateResults = distributeResults(dates, result);

				res.status(200).send(dateResults);
			} catch (err) {
				res.status(500).send(err);
			}
		},

		getById: async (req, res) => {
			try {
				const query = queryFactoryInstance.queryGetById(req);
				const result = await queriesInstance.executeQuery(query);
				res.status(200).send(result);
			} catch (err) {
				res.status(500).send(err);
			}
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
				const result = await queriesInstance.executeQuery(query);
				res.status(200).send(result);
			} catch (err) {
				res.status(500).send(err);
			}
		},

		delete: async (req, res) => {
			try {
				const query = queryFactoryInstance.queryDelete(req);
				const result = await queriesInstance.executeQuery(query);
				res.status(200).send(result);
			} catch (err) {
				res.status(500).send(err);
			}
		}
	}
}

module.exports = amountLogController;