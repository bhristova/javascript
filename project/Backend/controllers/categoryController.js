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
            res.status(200).send(result);
            next();
        }).catch(err => {
          res.status(500).send(err);
        });
    },
    getById: (req, res, next) => {
        const query = queryFactoryInstance.queryGetById(req);
        queriesInstance
          .executeQuery(query)
          .then(result => {
            res.status(200).send(result);
            next();
        }).catch(err => {
          res.status(500).send(err);
        });
    },
    create: (req, res, next) => {
        const query = queryFactoryInstance.queryCreate(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.status(200).send(result);
              next();
          }).catch(err => {
            res.status(500).send(err);
          });
    },
    update: (req, res, next) => {
        const query = queryFactoryInstance.queryUpdate(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.status(200).send(result);
              next();
          }).catch(err => {
            res.status(500).send(err);
          });
    },
    delete: (req, res, next) => {
        const query = queryFactoryInstance.queryDelete(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.status(200).send(result);
              next();
          }).catch(err => {
            res.status(500).send(err);
          });
    }
  }
}

module.exports = categoryController;