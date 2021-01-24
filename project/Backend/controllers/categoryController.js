const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

categoryController = () => {
  const tableName = 'L_category';
  const queriesInstance = query();
  const queryFactoryInstance = queryFactory(tableName);

  return {
    getAll: (req, res, next) => {
        const query = queryFactoryInstance.queryGetAll(req);
        queriesInstance
          .executeQuery(query)
          .then(result => {
            res.send(result);
            next();
        });
    },
    getById: (req, res, next) => {
        const query = queryFactoryInstance.queryGetById(req);
        queriesInstance
          .executeQuery(query)
          .then(result => {
            res.send(result);
            next();
        });
    },
    create: (req, res, next) => {
        const query = queryFactoryInstance.queryCreate(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.send(result);
              next();
          });
    },
    update: (req, res, next) => {
        const query = queryFactoryInstance.queryUpdate(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.send(result);
              next();
          });
    },
    delete: (req, res, next) => {
        const query = queryFactoryInstance.queryDelete(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.send(result);
              next();
          });
    }
  }
}

module.exports = categoryController;