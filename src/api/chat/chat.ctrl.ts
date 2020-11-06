import { Context } from 'koa';
import { model } from 'mongoose';

import {
  MAFIA,
  FULL,
  PLAYING,
  TABULA,
  WAIT,
  WARE_WOLF
} from '../../models/types';

import { decodeToken, getAccessTokenCookie } from '../../lib/token';
import Room from '../../schemas/room';
import Chat from '../../schemas/chat';

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

export async function createRoom(ctx: Context) {
  const { roomType, roomTitle, userName } = ctx.request.body;
  const statusCode = await checkStatus(ctx);

  if (statusCode !== SUCCESS) {
    ctx.status = statusCode;

    return;
  }

  try {
    const room = new Room({
      count: 1, 
      maxCount: 12,
      owner: userName,
      roomTitle: roomTitle,
      roomType: roomType,
      status: 'wait'
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