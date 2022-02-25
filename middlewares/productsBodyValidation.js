const { schemaProduct } = require('../schemas/productSchema');

const productBodyValidation = (req, _res, next) => {
  const { error } = schemaProduct.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');
    const handleError = { status: Number(status), message };
    return next(handleError);
  }
  return next();
};

module.exports = {
  productBodyValidation,
};