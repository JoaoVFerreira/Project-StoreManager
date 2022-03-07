const connection = require('./connection');

const productModel = require('./productsModel');

const QUERYALL = `SELECT * FROM StoreManager.sales
JOIN StoreManager.sales_products AS SP
ON SP.sale_id = id
ORDER BY sale_id ASC,
product_id ASC;`;

const QUERYID = `SELECT * FROM StoreManager.sales
JOIN StoreManager.sales_products AS SP
ON SP.sale_id = id
WHERE sale_id = ?
ORDER BY sale_id ASC,
product_id ASC;`;

const QUERYREGISTER = `INSERT INTO StoreManager.sales_products 
(sale_id, product_id, quantity) VALUES(?, ?, ?);`;

const QUERY_ID_INSERT = 'INSERT INTO StoreManager.sales (date) VALUES(now());';

const QUERY_UPDATE_SALES = `UPDATE StoreManager.sales 
SET 
    date = NOW()
WHERE
    id = ?;`;

const QUERY_UPDATE_SALES_PRODUCTS = `UPDATE StoreManager.sales_products 
SET 
    product_id = ?,
    quantity = ?
WHERE
    sale_id = ?;`;

const QUERY_UPDATE_PRODUCTS_AFTER_DELETE = `UPDATE StoreManager.products 
SET 
    quantity = quantity + ?
WHERE
    id = ?;`;

const QUERY_DELETE_SALE = `DELETE FROM StoreManager.sales 
WHERE
    id = ?;`;

const QUERY_UPDATE_QUANTITY = `UPDATE StoreManager.products 
SET 
    quantity = quantity - ?
WHERE
    id = ?;`;

const updateQuantityProductSale = async ({ quantity, productId }) => {
  await connection.execute(QUERY_UPDATE_QUANTITY, [quantity, productId]);
};

const getAll = async () => {
  try {
    const [rows] = await connection.execute(QUERYALL);
    return rows.map((row) => ({
      saleId: row.sale_id,
      date: row.date,
      productId: row.product_id,
      quantity: row.quantity,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

const findById = async (id) => {
  try {
    const [rows] = await connection.execute(QUERYID, [id]);
    return rows.map((row) => ({
      date: row.date,
      productId: row.product_id,
      quantity: row.quantity,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

const createIdForSale = async () => {
  const [idSale] = await connection.execute(QUERY_ID_INSERT); 
  return idSale.insertId;
};

const verifyProductQuantity = async (body) => {
  const sales = await Promise.all(body.map(async ({ productId, quantity }) => {
    const [product] = await productModel.findById(productId);
    return product.quantity - quantity > 0;
  }));
  return sales;
};

const registerSale = async (body) => {
  try {
    const saleId = await createIdForSale();
    await Promise.all(body.map(async ({ productId, quantity }) => {
      await connection.execute(QUERYREGISTER, [saleId, productId, quantity]);
    }));
   
    await Promise.all(body.map(updateQuantityProductSale));
    
    return {
      id: saleId,
      itemsSold: body,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSale = async (id) => {
  await connection.execute(QUERY_UPDATE_SALES, [id]);
};

const updateSaleProducts = async (id, body) => {
  try {
    await updateSale(id);
    const { productId, quantity } = body[0];
    await connection.execute(QUERY_UPDATE_SALES_PRODUCTS, [productId, quantity, id]);
  
    return {
      saleId: id,
      itemUpdated: body,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteSale = async (id) => {
  try {
    const products = await findById(id);
    await Promise.all(products.map(async ({ quantity, productId }) => {
      await connection.execute(QUERY_UPDATE_PRODUCTS_AFTER_DELETE, [quantity, productId]);
    }));
    const [deletedSale] = await connection.execute(QUERY_DELETE_SALE, [id]);
    if (deletedSale.affectedRows === 0) return null;
    
    return deletedSale;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  findById,
  registerSale,
  updateSaleProducts,
  deleteSale,
  verifyProductQuantity,
};