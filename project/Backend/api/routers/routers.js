const { Router } = require('express');
const amountLogController = require('../../controllers/amountLogController');
const categoryController = require('../../controllers/categoryController');
const periodController = require('../../controllers/periodController');
const userController = require('../../controllers/userController');
const authenticate = require('../../middleware/auth');

const amountLogContorllerInstance = amountLogController();
const categoryContorllerInstance = categoryController();
const periodControllerInstance = periodController();
const userControllerInstance = userController();

const setRoutes = (router, name, controller) => {
	setAuthMiddleware(router, name);
		
	if(name === 'period') {
		router.route(`/${name}/statistics/:id`)
			.get(controller.getPeriodStatistics);
	}

	if(name === 'user') {
		router.route(`/${name}/login`)
			.post(controller.login);
	}
	
	router.route(`/${name}`)
		.get(controller.getAll)
		.post(controller.create);

	router.route(`/${name}/*`)
		.get(controller.getAll)
		.post(controller.create);
	
	router.route(`/${name}/:id`)
		.get(controller.getById)
		.put(controller.update)
		.delete(controller.delete);
};

setAuthMiddleware = (router, name) => {
	if (name !== 'user') {
		router.use(`/${name}/statistics/:id`, authenticate);
		router.use(`/${name}`, authenticate);
		router.use(`/${name}/*`, authenticate);
		router.use(`/${name}/:id`, authenticate);
	}
}
			
module.exports.setRouting = (app) => {
	const rootPath = '/api';

	const router = Router();

	setRoutes(router, 'amountLog', amountLogContorllerInstance);
	setRoutes(router, 'category', categoryContorllerInstance);
	setRoutes(router, 'period', periodControllerInstance);
	setRoutes(router, 'user', userControllerInstance);

	app.use(rootPath, router);
};