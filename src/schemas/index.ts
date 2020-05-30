import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

import chat from './chat';
import room from './room';

const { NODE_ENV } = process.env;

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${NODE_ENV}`)
});

const { MONGO_ID, MONGO_PASSWORD } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

function connect() {
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose.connect(MONGO_URL, {
    dbName: 'chat', 
    useNewUrlParser: true
  }, (err) => {
    console.log(MONGO_URL);
    if (err) {
      console.log('mongoose is not connected!');

      return;
    }

    console.log('mongoose is connected!');
  });
}

function connectMongo() {
  connect();

  mongoose.connection.on('error', (err) => {
    console.error('mongoose error!', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('mongoose is disconnected');

    connect();
  });

  mongoose.model('Chat', chat);
  mongoose.model('Room', room);
}

export default connectMongo;