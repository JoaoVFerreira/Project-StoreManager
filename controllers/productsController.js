const productsService = require('../services/productsService');

const getAllProducts = async (_req, res, next) => {
  try {
    const allProducts = await productsService.getAll();
    return res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [product] = await productsService.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};