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

const registerProduct = async (name, quantity) => {
  const onlyOneProductInDB = await productsModel.registerProduct(name, quantity);
  const alreadyExistsError = { status: 409, message: 'Product already exists' };
  if (!onlyOneProductInDB) throw alreadyExistsError;

  return onlyOneProductInDB;
};

module.exports = {
  getAll,
  findById,
  registerProduct,
};
