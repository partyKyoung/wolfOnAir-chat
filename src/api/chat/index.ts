import Router from '@koa/router';

import { createRoom, getLobby } from './chat.ctrl';

const chat = new Router();

chat.get('/lobby', getLobby);
chat.post('/room', createRoom);

export default chat;