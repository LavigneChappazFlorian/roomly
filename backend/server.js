const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const app = express();
const { Server } = require("socket.io");
const { sequelize, Chat } = require("./config/database");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(helmet());
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successfull!");
  })
  .catch((error) => {
    console.error("Error Database connection: ", error);
  });

app.get("/", (req, res) => {
  res.status(200).send("Server online!");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Client is connected (ID: ${socket.id})`);

  socket.on("join_room", (data) => {
    const room = data.room;
    socket.join(room);
    console.log(`Client joined room: ${room}`);

    Chat
      .findAll({
        where: { room: room },
        order: [["createdAt", "ASC"]],
      })
      .then((messages) => {
        socket.emit("load_messages", messages);
      })
      .catch((err) => {
        console.log("Erreur lors de la récupération des messages : ", err);
      });
  });

  socket.on("leave_room", (data) => {
    const room = data.room;
    socket.leave(room);
    console.log(`Client leaved room: ${room}`);
  });

  socket.on("send_message", (data) => {
    const createdAt = new Date().toISOString();

    const payload = {
      username: data.username,
      message: data.message,
      room: data.room,
      createdAt: createdAt,
    };

    Chat.create(payload)
      .then(() => {
        console.log("Message saved in the database");
        io.to(payload.room).emit("receive_message", payload);
      })
      .catch((error) => {
        console.error("Error during message saving");
      });

    console.log(
      `Message received from: room ${payload.room} from ${payload.username}`,
    );
  });

  socket.on("disconnect", () => {
    console.log(`Client with id ${socket.id} is disconnected`);
  });
});
