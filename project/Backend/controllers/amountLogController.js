const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

amountLogController = () => {
  const tableName = 'amountLog';
  const queriesInstance = query();
  const queryFactoryInstance = queryFactory(tableName);

  return {
    getAll: (req, res) => {
        const options = req.body.options || {top: 15, ordering: 'desc'};
        if(req.params[0]) {
          const date = req.params[0];
          options.lastDate = date.substr(date.indexOf('=') + 1, date.length);
        }
        const query = queryFactoryInstance.queryGetAll(req, options);
        queriesInstance
          .executeQuery(query)
          .then(result => {
            const dates = [...result.map(elem => elem.date)].filter((date, i, self) => 
              self.findIndex(d => d.getTime() === date.getTime()) === i
            );
            res.status(200).send(dates.map(date => result.filter(elem => {
              const filterDate = new Date(date);
              const currentDate = new Date(elem.date);
              return currentDate.getFullYear() === filterDate.getFullYear() &&
                     currentDate.getMonth()    === filterDate.getMonth() &&
                     currentDate.getDate()     === filterDate.getDate();
            })));
        }).catch(err => {
          res.status(500).send(err);
        });
    },

    getById: (req, res) => {
        const query = queryFactoryInstance.queryGetById(req);
        queriesInstance
          .executeQuery(query)
          .then(result => {
            res.status(200).send(result);
        }).catch(err => {
          res.status(500).send(err);
        });
    },

    create: (req, res) => {
        const query = queryFactoryInstance.queryCreate(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.status(200).send(result);
          }).catch(err => {
            res.status(500).send(err);
          });
    },

    update: (req, res) => {
        const query = queryFactoryInstance.queryUpdate(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.status(200).send(result);
          }).catch(err => {
            res.status(500).send(err);
          });
    },
    
    delete: (req, res) => {
        const query = queryFactoryInstance.queryDelete(req);
        return queriesInstance
          .executeQuery(query)
          .then(result => {
              res.status(200).send(result);
          }).catch(err => {
            res.status(500).send(err);
          });
    }
  }
}

module.exports = amountLogController;