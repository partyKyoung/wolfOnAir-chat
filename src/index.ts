import Koa, { Context } from 'koa';


import connect from './schemas';

const app = new Koa();

connect();

app.use((ctx: Context) => {
  ctx.body = "test";
})

app.listen(4000, () => {
  console.log('Listening to port 4000');
})