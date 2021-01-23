module.exports.amountLogFactory =
  amountLogFactory = ({ strict } = { strict: false }) => {
    return function (req, res, next) {
      const { firstName, lastName, age } = req.body || {};
      if (strict && (!firstName || !lastName || !age)) {
        return void next(new Error('BAD_REQUEST'));
      }
      req.body = { firstName, lastName, age: +age };
      next();
    };
  };