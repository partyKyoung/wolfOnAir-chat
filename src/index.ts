import Koa, { Context } from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

import api from './api';
import socket from './socket';
import connect from './schemas';

const app = new Koa();
const router = new Router();

connect();

router.use('/api', api.routes());

// cors
app.use((ctx, next) => {
  const { origin } = ctx.headers;

  ctx.set('Access-Control-Allow-Origin', origin);
  ctx.set('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  ctx.set("Access-Control-Allow-Credentials", 'true');

  return next();
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(4000, () => {
  console.log('Listening to port 4000');
})

socket(server, app);