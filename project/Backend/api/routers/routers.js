const { Router } = require('express');
const amountLogController = require('../../controllers/amountLogController');

module.exports.setRouting = (app) => {
  const rootPath = '/api';

  const router = Router();

  setAmountLogRoutes(router);
  app.use(rootPath, router);
};

const amountLogContorllerInstance = amountLogController();

const setAmountLogRoutes = (router) => {
  router.route('/amountLog')
    .get(amountLogContorllerInstance.getAll)
    .post(amountLogContorllerInstance.create);

  router.route("/api/user/:id")
    .get(amountLogContorllerInstance.getById)
    // .delete(amountLogContorllerInstance.delete)

};