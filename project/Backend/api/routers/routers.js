const { Router } = require('express');
const amountLogController = require('../../controllers/amountLogController');
const categoryController = require('../../controllers/categoryController');

const amountLogContorllerInstance = amountLogController();
const categoryContorllerInstance = categoryController();

const setRoutes = (router, name, controller) => {
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

module.exports.setRouting = (app) => {
  const rootPath = '/api';

  const router = Router();

  setRoutes(router, 'amountLog', amountLogContorllerInstance);
  setRoutes(router, 'category', categoryContorllerInstance);

  app.use(rootPath, router);
};