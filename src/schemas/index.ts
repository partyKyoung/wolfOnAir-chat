import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

// import chat from './chat';
// import room from './room';

const { NODE_ENV } = process.env;

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${NODE_ENV}`)
});

const { MONGO_ID, MONGO_PASSWORD } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017`;

function connect() {
  console.log(123, mongoose);

  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose.connect(MONGO_URL, {
    dbName: 'wolfonair', 
    useNewUrlParser: true
  }, (err) => {
    if (err) {
      console.log(MONGO_URL);
      console.log('mongoose is not connected!');

      return;
    }

    console.log('mongoose is connected!');
  });
}

function connectMongo() {
  console.log('test');
  connect();

  mongoose.connection.on('error', (err) => {
    console.error('mongoose error!', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('mongoose is disconnected');

    connect();
  });

  // room;
  // chat;
}

export default connectMongo;