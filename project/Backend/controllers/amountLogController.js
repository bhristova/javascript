const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

amountLogController = () => {
	const tableName = 'amountLog';
	const queriesInstance = query();
	const queryFactoryInstance = queryFactory(tableName);

	const getAllDates = (startDate, endDate, data) => {
		let result = [];
		let realStartDate = startDate;
		let realEndDate = endDate;
		
		const dates = data.map(elem => elem.date);
		dates.map(date => {
			if (date < realEndDate) {
				realEndDate = date;
			}
			if (date > realStartDate) {
				realStartDate = date;
			}
		});

		realEndDate = new Date(realEndDate);
		realStartDate = new Date(realStartDate);
		realStartDate.setDate(realStartDate.getDate() - 1);

		do {
			result.push(new Date(realStartDate));
			realStartDate.setDate(realStartDate.getDate() - 1);
		} while (realEndDate <= realStartDate)

		return result;
	}

	const getParamsFromUrl = (urlParams) => {
		let endDate = new Date();
		let periodId = '';

		if (urlParams) {
			endDate = urlParams.get('endDate');
			startDate = urlParams.get('startDate');
			periodId = urlParams.get('periodId');
			if (endDate) {
				endDate = endDate.includes('GMT') ? endDate.substring(0, endDate.indexOf('GMT')) : endDate;
				endDate = new Date(endDate);

				if (endDate > new Date()) {
					endDate = new Date();
					endDate.setDate(endDate.getDate() + 1);
				}

				endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
			}

			if(startDate) {
				startDate = startDate.includes('GMT') ? startDate.substring(0, startDate.indexOf('GMT')) : startDate;
				startDate = new Date(startDate);

				startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
			}
		}

		return {
			startDate: startDate,
			endDate: endDate,
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
				const { startDate, endDate, periodId } = getParamsFromUrl(params);

				const optionsFirst = {
					select: [{
						what: '*',
					}],
					tableName: tableName,
					filter: [
						{
							column: 'forPeriod',
							op: '=',
							value: `'${periodId}'`
						}, {
							column: 'date',
							op: '>',
							value: `date('${startDate}')`
						}
					],
					top: 15,
					ordering: 'desc',
					orderBy: 'date'
				};

				const optionsSecond = {
					select: [{
						what: '*',
					}],
					tableName: tableName,
					filter: [{
						column: 'date',
						op: '=',
						value: {
							select: [{
								what: 'dt',
								operation: 'MIN'
							}],
							from: {
								select: [{
									what: 'date',
									alias: 'dt'
								}],
								tableName: tableName,
								filter: [
									{
										column: 'forPeriod',
										op: '=',
										value: `'${periodId}'`
									}, {
										column: 'date',
										op: '>',
										value: `date(${startDate})`
									}
								],
								top: 15,
								orderBy: 'date',
								ordering: 'desc',
							},
							alias: 'dates'
						}
					}],
					orderBy: 'date',
					ordering: 'desc'
				};

				if(endDate) {
					optionsFirst.filter.push({
						column: 'date',
						op: '<',
						value: `date('${endDate}')`
					});

					optionsSecond.filter[0].value.from.filter.push({
							column: 'date',
							op: '<',
							value: `date(${endDate})`
						});
				}

				const union = { union: [optionsFirst, optionsSecond] };

				const query = queryFactoryInstance.queryGetAll(union);
				const result = await queriesInstance.executeQuery(query);

				const dates = getAllDates(endDate, startDate, result);
				const dateResults = distributeResults(dates, result);

				res.status(200).send(dateResults);
			} catch (err) {
				res.status(500).send(err);
			}
		},

		getById: async (req, res) => {
			try {
				const query = queryFactoryInstance.queryGetById(req, {});
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