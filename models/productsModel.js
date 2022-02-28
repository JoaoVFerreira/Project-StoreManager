const connection = require('./connection');

const getAll = async () => {
  const QUERY = 'SELECT * FROM products ORDER BY id ASC';

  const [rows] = await connection.execute(QUERY);
  return rows;
};

const findById = async (id) => {
  const QUERY = 'SELECT * FROM products WHERE id = ?';

  const [rows] = await connection.execute(QUERY, [id]);
  return rows;
};

const registerProduct = async (name, quantity) => {
  const allProducts = await getAll();
  if (allProducts.find((row) => row.name === name)) return null;

  const QUERY = 'INSERT INTO StoreManager.products (name, quantity) VALUES(?, ?)';
  const [registered] = await connection.execute(QUERY, [name, quantity]);

  return {
    id: registered.insertId,
    name,
    quantity,
  };
};

const updateProduct = async (name, quantity, id) => {
  const QUERY = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';
  const [update] = await connection.execute(QUERY, [name, quantity, id]);
  console.log(update);

  if (update.affectedRows === 0) return null;

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
 const rowId = await findById(id);
 if (rowId.length === 0) return null;

 const QUERY = 'DELETE FROM StoreManager.products WHERE id = ?;';
 const wipeOutProduct = await connection.execute(QUERY, [id]);
 return wipeOutProduct;
};

module.exports = {
  getAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
