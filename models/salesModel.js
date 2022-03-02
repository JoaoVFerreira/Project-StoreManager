const connection = require('./connection');

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

const QUERY_DELETE_SALE = `DELETE FROM StoreManager.sales 
WHERE
    id = ?;`;

const getAll = async () => {
  const [rows] = await connection.execute(QUERYALL);
  return rows.map((row) => ({
    saleId: row.sale_id,
    date: row.date,
    productId: row.product_id,
    quantity: row.quantity,
  }));
};

const findById = async (id) => {
  const [rows] = await connection.execute(QUERYID, [id]);
  return rows.map((row) => ({
    date: row.date,
    productId: row.product_id,
    quantity: row.quantity,
  }));
};

const createIdForSale = async () => {
  const [idSale] = await connection.execute(QUERY_ID_INSERT); 
  return idSale.insertId;
};

const insertSale = async ({ productId, quantity }) => {
  await connection.execute(QUERYREGISTER, [productId, quantity]);
};

const registerSale = async (body) => {
  const saleId = await createIdForSale();
  body.map(insertSale);

  return {
    id: saleId,
    itemsSold: body,
  };
};

const updateSale = async (id) => {
  await connection.execute(QUERY_UPDATE_SALES, [id]);
};

const updateSaleProducts = async (id, body) => {
  await updateSale(id);
  const { productId, quantity } = body[0];
  await connection.execute(QUERY_UPDATE_SALES_PRODUCTS, [productId, quantity, id]);

  return {
    saleId: id,
    itemUpdated: body,
  };
};

const deleteSale = async (id) => {
  const [deletedSale] = await connection.execute(QUERY_DELETE_SALE, [id]);
  if (deletedSale.affectedRows === 0) return null;
  
  return deletedSale;
};

module.exports = {
  getAll,
  findById,
  registerSale,
  updateSaleProducts,
  deleteSale,
};