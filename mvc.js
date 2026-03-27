const express = require("express");
const app = express();
app.use(express.json());
const users = [
  { id: 1, name: "Pallav", role: "Developer" },
  { id: 2, name: "Aneesh", role: "Designer" },
  { id: 3, name: "Riya", role: "Tester" }
];
const getAllUsers = () => {
  return users;
};
const getUsersController = (req, res, next) => {
  try {
    const data = getAllUsers();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
app.get("/api/users", getUsersController);
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error"
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
