import Koa, { Context } from 'koa';
import Router from '@koa/router';

import api from './api';
import socket from './socket';
import connect from './schemas';

const app = new Koa();
const router = new Router();

connect();

router.use('/api', api.routes());
app.use(router.routes().arguments(router.allowedMethods()));

const server = app.listen(4000, () => {
  console.log('Listening to port 4000');
})

socket(server, app);