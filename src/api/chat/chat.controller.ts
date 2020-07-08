import { Context } from 'koa';
import { model } from 'mongoose';

import { decodeToken, getAccessTokenCookie } from '../../lib/token';
import Room from '../../schemas/room';
import Chat from '../../schemas/chat';
import socket from 'src/socket';
import { decode } from 'punycode';
import { resolve } from 'path';

type StatusCodeTypes = 401 | 200 | 500;

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const ERROR = 500;

async function checkStatus(ctx: Context): Promise<StatusCodeTypes> {
  const { uid } = ctx.params;
  const token = getAccessTokenCookie(ctx);

  // 토큰이 없으면 다음 작업을 진행한다.
  if (!token) {
    return UNAUTHORIZED
  }

  try {
    const decoded: any = await decodeToken(token);

    if (uid !== decoded.uid) {
      return UNAUTHORIZED;
    }

    const rooms = await Room.find({});

    return SUCCESS;
  } catch (err) {
    return ERROR;
  }
}

export async function getLobby(ctx: Context) {
  try {
    const statusCode = await checkStatus(ctx);
    const rooms = await Room.find({});

    if (statusCode !== SUCCESS) {
      ctx.status = statusCode;

      return;
    }

    ctx.status = SUCCESS;
    ctx.body = {
      rooms
    }
  } catch (err) {
    ctx.status = ERROR;
  }
}

// 룸타입 1: 단어마피아
export async function createRoom(ctx: Context) {
  const { roomTitle, userName } = ctx.request.body;
  const statusCode = await checkStatus(ctx);

  if (statusCode !== SUCCESS) {
    ctx.status = statusCode;

    return;
  }

  try {
    const room = new Room({
      roomTitle: roomTitle,
      owner: userName,
      maxCount: 8,
      roomType: 1
    });
  
    const newRoom = await room.save();
    const io = ctx.io;
 
    io.of('/room').emit('newRoom', newRoom);
  
    ctx.status = SUCCESS;
    ctx.body = {
      roomId: newRoom._id
    }

  } catch (err) {
    ctx.status = ERROR;
  }

}