const productsModel = require('../models/productsModel');

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  const noProductsError = { status: 404, message: 'There is no products in database' };
  if (allProducts.length === 0) throw noProductsError;

  return allProducts;
};

const findById = async (id) => {
  const getProductById = await productsModel.findById(id);
  const noProductIdError = { status: 404, message: 'Product not found' };
  if (getProductById.length === 0) throw noProductIdError;

  return getProductById;
};

module.exports = {
  getAll,
  findById,
};