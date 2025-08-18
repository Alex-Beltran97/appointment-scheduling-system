import { Server as IOServer } from "socket.io";

let io: IOServer;

export const setIO = (ioInstance: IOServer) => {
  io = ioInstance;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};