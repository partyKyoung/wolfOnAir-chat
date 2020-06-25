import http from 'http';
import Koa, { Context } from 'koa';
import SocketIO from 'socket.io';

import { decodeToken, getAccessTokenCookie } from './lib/token';

import Room from './schemas/room';

import { getLobby } from './lib/chat';

async function socket(server: http.Server, app: Koa) {
  const io: SocketIO.Server = SocketIO(server, { path: '/socket.io'});
  let lobbyId = '';
  //  라우터에서 io 객체를 쓸 수 있게 저장해둔다.
  app.context.io = io;

  /* 
    Socket.io에 of 메소드를 사옹하여 네임스페이스를 부여한다.
    지정된 네임스페이스에 연결된 클라이언트에만 데이터를 전달할 수 있다.
  */

  // 채팅방 생성 및 삭제에 관한 정보 전달 하는 네임스페이스
  const room = io.of('/room');

  // 채팅 메시지를 전달하는 네임스페이스
  const chat = io.of('/chat');

  // room 네임스페이스에 이벤트 리스너 붙여줌
  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 연결 끊음');
    })
  });

  // chat 네임스페이스에 이벤트 리스너 붙여줌
  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    
    socket.on('joinConnect', async ({userName}) => {
      const req = socket.request;
      const { headers: { referer }} = req;
      let roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');

      if (roomId === 'lobby') {
        roomId = await getLobby();
      }

      socket.join(roomId);
      socket.emit('join', {
        user: 'system',
        message: `${userName}님이 입장하셨습니다.`
      })
    })

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
    });
  });
};

export default socket;
