import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

// import chat from './chat';
import lobby from './lobby';
import room from './room';

const { NODE_ENV } = process.env;

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${NODE_ENV}`)
});

const { MONGO_ID, MONGO_PASSWORD } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

function connect() {
  // 운영환경이 아닐 때 몽구스가 생성하는 쿼리 내용을 콘솔로 확인할 수 있다.
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  // 몽구스와 몽고디비를 연결한다. 몽고디비 주소로 접속을 시도한다.
  mongoose.connect(MONGO_URL, {
    dbName: 'wolfonair',  // 접속을 시도하는 주소의 db는 admin이지만 실제로 사용할  db는 wolfonair이므로 dbName 옵션을 주어 wolfonair db를 사용하게 한다.
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) {
      console.log('mongoose is disconnected.', err);

      return;
    }

    console.log('mongoose is connected!');
  });
}

/* mongoose 커넥션에 이벤트 리스너를 단다 - 에러 발생 시 에러 내용을 기록한다. */

mongoose.connection.on('error', (err) => {
  console.error('mongoose error.', err);
});

mongoose.connection.on('disconnected', () => {
  console.error('mongoose is disconnected. connect try again...');

  // 연결 종료 시 재연결을 시도한다.
  connect();
});

export default connect;