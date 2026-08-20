const express = require("express");
const path = require("path");
const app = express();
const io = require("socket.io");

app.use(express.static(path.join(__dirname, "../frontend/src")));
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/src", "app.html"));
});
