const { Router } = require('express');
const { amountLogFactory } = require('./amountLog.middleware');

const router = Router();
const amountLogController = generateControllers('users');

router.route('/')
  .get(amountLogController.queryAll)
  .post(
    amountLogFactory({ strict: true }),
    amountLogController.create
  );

router.route('/:id')
  .get(amountLogController.queryOne)
  .put(
    amountLogFactory({ strict: false }),
    amountLogController.update
  )
  // .delete(amountLogController.remove);

module.exports = router;