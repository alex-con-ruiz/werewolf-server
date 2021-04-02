import { CreateRoomData, joinRoomData } from "./interfaces/interfaces";
import { createRoom, disconnect, joinRoom, rejoin } from "./io-events";

const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5001;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server, { cors: { origin: '*' } });

io.on("connection", (socket: any) => {

  console.log(`Se conecto: ${socket.id}`);

  socket.on('createRoom', (data: CreateRoomData) => createRoom(socket, data));

  socket.on('joinRoom', (data: joinRoomData) => joinRoom(socket, data, io));

  socket.on('rejoinRoom', (data: any) => rejoin(socket, io, data))

  socket.on('disconnect', () => disconnect(socket.id, io));
});