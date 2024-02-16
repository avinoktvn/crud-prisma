const express = require("express");
const dotenv = require("dotenv");
const productController = require("./product/product.controller");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("INI API QUEH");
});

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
