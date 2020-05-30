import Koa, { Context } from 'koa';

import socket from './socket';
import connect from './schemas';

const app = new Koa();

connect();

app.use((ctx: Context) => {
  ctx.body = "test";
})

const server = app.listen(4000, () => {
  console.log('Listening to port 4000');
})

socket(server, app);