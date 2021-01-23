const queries = require('../db/queries');

amountLogController = () => {
  const queriesInstance = queries('amountLog');
  return {
    getAll: (req, res, next) => {
        queriesInstance.get({}).then(users => {
        res.locals.data = users;
        next();
      });
    },
    getById: (req, res, next) => {
        queriesInstance.get({ _id: req.params.id }).then(users => {
        res.locals.data = users;
        next();
      });
    },
    create: (req, res, next) => {
      return queriesInstance
        .insert(req.body)
        .then(user => {
            res.locals.data = user;
            next();
        });
    },
    update: (req, res, next) => {
      return queriesInstance.update({ _id: req.params.id }, req.body).then(user => {
        res.locals.data = user;
        next();
      });
    },
    remove: (req, res, next) => {
      return queriesInstance.remove({ _id: req.params.id }).then(user => {
        res.locals.data = user;
        next();
      });
    }
  }
}

module.exports = amountLogController;