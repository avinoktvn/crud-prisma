// service layer handle bisnis logic
// di pisah agar reusable

const prisma = require("../db");
const { findProducts, findProductById, insertProduct, deleteProduct, editProduct } = require("./product.repository");

const getAllProduct = async () => {
  const product = await findProducts();

  return product;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProduct(id);
  // DELETE FROM product WHERE id = {productId}
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);

  return product;
};

module.exports = { getAllProduct, getProductById, createProduct, deleteProductById, editProductById };
