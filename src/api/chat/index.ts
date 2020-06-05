import Router from '@koa/router';

import { getLobby } from './chat.controller';

const chat = new Router();

chat.get('/lobby', getLobby);

export default chat;