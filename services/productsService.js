const productsModel = require('../models/productsModel');

const notFoundProductError = { status: 404, message: 'Product not found' };

const getAll = async () => {
  const allProducts = await productsModel.getAll();
  const noProductsError = { status: 404, message: 'There is no products in database' };
  if (allProducts.length === 0) throw noProductsError;
  return allProducts;
};

const findById = async (id) => {
  const getProductById = await productsModel.findById(+id);
  if (getProductById.length === 0) throw notFoundProductError;
  return getProductById;
};

const registerProduct = async (name, quantity) => {
  const onlyOneProductInDB = await productsModel.registerProduct(name, quantity);
  const alreadyExistsError = { status: 409, message: 'Product already exists' };
  if (!onlyOneProductInDB) throw alreadyExistsError;
  return onlyOneProductInDB;
};

const updatedProduct = async (name, quantity, id) => {
  const isUpdated = await productsModel.updateProduct(name, quantity, +id);
  if (!isUpdated) throw notFoundProductError;
  return isUpdated;
};

const deleteProduct = async (id) => {
  const delectedProduct = await productsModel.deleteProduct(+id);
  if (!delectedProduct) throw notFoundProductError;
  return delectedProduct;
};

module.exports = {
  getAll,
  findById,
  registerProduct,
  updatedProduct,
  deleteProduct,
};
