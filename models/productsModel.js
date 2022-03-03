const connection = require('./connection');

const getAll = async () => {
  try {
    const QUERY = 'SELECT * FROM StoreManager.products ORDER BY id ASC';
    const [rows] = await connection.execute(QUERY);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findById = async (id) => {
  try {
    const QUERY = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [rows] = await connection.execute(QUERY, [id]);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const registerProduct = async (name, quantity) => {
  try {
    const allProducts = await getAll();
    if (allProducts.find((row) => row.name === name)) return null;
    const QUERY = 'INSERT INTO StoreManager.products (name, quantity) VALUES(?, ?);';
    const [registered] = await connection.execute(QUERY, [name, quantity]);

    return {
      id: registered.insertId,
      name,
      quantity,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (name, quantity, id) => {
  try {
    const QUERY = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';
    const [update] = await connection.execute(QUERY, [name, quantity, id]);
    if (update.affectedRows === 0) return null;

    return {
      id,
      name,
      quantity,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const rowId = await findById(id);
    if (rowId.length === 0) return null;

    const QUERY = 'DELETE FROM StoreManager.products WHERE id = ?;';
    const wipeOutProduct = await connection.execute(QUERY, [id]);
    return wipeOutProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
