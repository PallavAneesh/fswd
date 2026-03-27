const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" }
];
app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users retrieved successfully",
    data: users
  });
});
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    data: newUser
  });
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  user.name = name || user.name;

  res.status(200).json({
    message: "User updated successfully",
    data: user
  });
});
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users.splice(userIndex, 1);

  res.status(200).json({
    message: "User deleted successfully"
  });
});

app.get("/error", (req, res) => {
  try {
    throw new Error("Simulated server error");
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
