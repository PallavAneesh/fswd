const express = require("express");
const app = express();
app.use(express.json());
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 }
];
const Model = {
  getAll: () => products,

  getById: (id) => products.find(p => p.id === id),

  create: (data) => {
    const newProduct = { id: Date.now(), ...data };
    products.push(newProduct);
    return newProduct;
  },

  update: (id, data) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    return products[index];
  },

  delete: (id) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    return products.splice(index, 1);
  }
};
const Controller = {
  getProducts: (req, res, next) => {
    try {
      const data = Model.getAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
  getProduct: (req, res, next) => {
    try {
      const product = Model.getById(parseInt(req.params.id));
      if (!product) return res.status(404).json({ message: "Not Found" });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },
  createProduct: (req, res, next) => {
    try {
      const { name, price } = req.body;
      if (!name || !price)
        return res.status(400).json({ message: "Invalid Data" });

      const newProduct = Model.create({ name, price });
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  },

  updateProduct: (req, res, next) => {
    try {
      const updated = Model.update(parseInt(req.params.id), req.body);
      if (!updated)
        return res.status(404).json({ message: "Not Found" });

      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  },

  deleteProduct: (req, res, next) => {
    try {
      const deleted = Model.delete(parseInt(req.params.id));
      if (!deleted)
        return res.status(404).json({ message: "Not Found" });

      res.status(200).json({ message: "Deleted Successfully" });
    } catch (err) {
      next(err);
    }
  }
};
app.get("/api/products", Controller.getProducts);
app.get("/api/products/:id", Controller.getProduct);
app.post("/api/products", Controller.createProduct);
app.put("/api/products/:id", Controller.updateProduct);
app.delete("/api/products/:id", Controller.deleteProduct);
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
