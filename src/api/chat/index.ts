import Router from '@koa/router';

import { getLobby, sendMessage } from './chat.controller';

const chat = new Router();

chat.get('/lobby', getLobby);
chat.post('/:roomId/message', sendMessage);

export default chat;