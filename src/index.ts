import express from "express";
import { Server, Socket } from 'socket.io';
import { AskCheckData, CheckAcceptanceData, CreateRoomData, joinRoomData, reJoinRoomData } from './interfaces/interfaces';
import { askCheck, checkAcceptance, createRoom, disconnect, joinRoom, rejoin } from "./io-events";


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
const io = new Server(server, { cors: { origin: '*' } });

io.on("connection", (socket: Socket) => {

  // console.log(`Se conecto: ${socket.id}`);

  socket.on('createRoom', (data: CreateRoomData) => createRoom(socket, data));

  socket.on('joinRoom', (data: joinRoomData) => joinRoom(socket, data, io));

  socket.on('rejoinRoom', (data: reJoinRoomData) => rejoin(socket, io, data))

  socket.on('disconnect', () => disconnect(socket.id, io));

  //TODO: Leave Room.

  // Game -- ReadyCheck
  socket.on('askCheck', (data: AskCheckData) => askCheck(data, io, socket));
  socket.on('readyConfimation', (data: CheckAcceptanceData) => checkAcceptance(data));

  // Game -- Game Running
});