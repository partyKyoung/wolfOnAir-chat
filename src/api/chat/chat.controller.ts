import { model } from 'mongoose';

import { decodeToken, getAccessTokenCookie } from '../../lib/token';
import Room from '../../schemas/room';
import Chat from '../../schemas/chat';
import socket from 'src/socket';
import { decode } from 'punycode';

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

    const rooms = await Room.find({});

    ctx.status = 200;
    ctx.body = {
      rooms
    }
  } catch (err) {

    ctx.status = 500;
  }

  // 체팅방 접속
}
