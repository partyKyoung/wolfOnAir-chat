import { model } from 'mongoose';

import { decodeToken, getAccessTokenCookie } from '../../lib/token';
import Room from '../../schemas/room';
import Chat from '../../schemas/chat';

export async function getLobby(ctx: any) {
  const { uid } = ctx.params;
  const token = getAccessTokenCookie(ctx);

  // 토큰이 없으면 다음 작업을 진행한다.
  if (!token) {
    ctx.status = 401;

    return;
  }

  try {
    const decoded: any = await decodeToken(token);

    if (uid !== decoded.uid) {
      ctx.status = 401;

      return;
    }

    // const rooms = await Room.find({ title: 'lobby' });

    // if (rooms.length <= 0) {
    //   const lobby = new Room({
    //     title: 'lobby',
    //     maxCount: 100,
    //     owner: 'admin',
    //   });

    //   const newLobby = await lobby.save();
      // const io = ctx.get('io');

      // io.of('/chat').emit('newLooby', newLobby);
    // } else {
    //   const lobby = rooms[0];
    //   const chats = await Chat.find({ room: lobby._id});


    //   ctx.body = {
    //     chats
    //   }
    // }

    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }

  // 체팅방 접속
}
