// handle validasi request dan response
// handle validasi body

const express = require("express");
const prisma = require("../db/index.js");
const { getAllProduct, getProductById, createProduct, deleteProductById, editProductById } = require("./product.services.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProduct();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id; // string

    await deleteProductById(parseInt(productId));

    res.send("Product deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const ProductData = req.body;

  if (!(ProductData.name && ProductData.description && ProductData.image && ProductData.price)) {
    return res.status(400).send("some data is missing");
  }

  const product = await editProductById(parseInt(productId), ProductData);
  res.send({
    data: product,
    message: "Product updated successfully",
    nodemo,
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.send({
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
