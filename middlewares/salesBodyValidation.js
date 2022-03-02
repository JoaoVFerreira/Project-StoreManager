const { schemaSale } = require('../schemas/saleSchema');

const saleBodyValidation = (req, _res, next) => {
  const { error } = schemaSale.validate(req.body[0]);

  if (error) {
    const [status, message] = error.message.split('|');
    const handleError = { status: Number(status), message };
    return next(handleError);
  }
  return next();
};

module.exports = {
  saleBodyValidation,
};