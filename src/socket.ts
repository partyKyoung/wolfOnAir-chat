import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import Koa from 'koa';

function socketIo(server: HttpServer, app: Koa) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
  });

  app.context.io = io;

  const chat = io.of('/chat');
  const room = io.of('/room');
  const lobby = io.of('/lobby');

  lobby.on('connection', () => {});

  room.on('connection', () => {});

  chat.on('connection', (socket) => {
    const { request } = socket;

    console.log(request);
  });
};

export default socketIo;