import { Context } from 'koa';
import { model } from 'mongoose';

import { decodeToken, getAccessTokenCookie } from '../../lib/token';
import Room from '../../schemas/room';
import Chat from '../../schemas/chat';
import socket from 'src/socket';
import { decode } from 'punycode';

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

export async function sendMessage(ctx: any) {
  try {
    const statusCode = await checkStatus(ctx);
    const { roomId } = ctx.params;
    const { message } = ctx.request.body;

    // if (statusCode !== SUCCESS) {
    //   ctx.status = statusCode;

    //   return;
    // }

    console.log(ctx.io.of('/chat').to(roomId).emit('chat', {
      message
    }));

    ctx.status = SUCCESS;
  } catch (err) {
    console.log(ctx);
    ctx.status = ERROR;
  }  
}