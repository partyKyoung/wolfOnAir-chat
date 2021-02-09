import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import Koa from 'koa';

import Chat from './schemas/chat';

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

  chat.on('connection', async (socket) => {
    const { handshake: { query } } = socket;
    const message = `${query.userName}님이 입장하셨습니다.`;
    const userName = 'system';

    socket.join(query.room);

    await Chat.create({
      room: query.room,
      type: userName,
      userName,
      message
    })

    // 방 접속
    chat.to(query.room).emit('join', {
      type: userName,
      userName,
      message
    });

    // 메시지 전송
    socket.on('sendMessage', async (data: any) => {
      const {
        message,
        room,
        userName,
      } = data;
      const type = 'user';

      await Chat.create({
        room,
        type,
        userName,
        message
      })

      chat.to(room).emit('getMessage', {
        type,
        userName,
        message
      })
    });
  });
};

export default socketIo;