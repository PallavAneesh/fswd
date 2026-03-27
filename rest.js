const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 }
];
app.get("/api/products", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products
  });
});
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Name and Price are required"
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct
  });
});
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  product.name = name || product.name;
  product.price = price || product.price;

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product
  });
});
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  products.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  });
});
app.get("/api/error", (req, res) => {
  try {
    throw new Error("Simulated error");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
