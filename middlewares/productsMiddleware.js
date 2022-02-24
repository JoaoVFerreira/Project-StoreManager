/* const productsService = require('../services/productsService');

const verifyGetAllProducts = async (_req, _res, next) => {
  const allProducts = await productsService.getAll();
  const noProductsError = { status: 404, message: 'There is no products in database' };

  if (allProducts.length === 0) throw noProductsError;

  next();
};

module.exports = {
  verifyGetAllProducts,
}; */