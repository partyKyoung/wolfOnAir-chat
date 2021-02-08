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

  chat.on('connect', (socket) => {
    const { handshake: { query } } = socket;

    socket.join(query.room);

    // chat.to(query.room).emit('join', {
    //   type: 'system',
    //   userName: 'system',
    //   message: `${query.userName}님이 입장하셨습니다.`
    // });

    // 메시지 전송
    socket.on('sendMessage' , (data: any) => {
      chat.to(data.room).emit('getMessage', {
        type: 'user',
        userName: data.userName,
        message: data.message
      })
    });
  });
};

export default socketIo;