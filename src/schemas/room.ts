import { model, Document, Model, Schema } from "mongoose";

import { RoomInterface } from '../interface/room';

interface RoomDocument extends RoomInterface, Document {
  _id: string;
}

const RoomSchema = new Schema({
  currentCount: Number, // 현재 입장 수
  maxCount: Number, // 최대 입장 수
  roomTitle: String, // 방이름
  roomStatus: String, // 상태
  roomMode: String // 게임 모드
});

const Room: Model<RoomDocument>  = model('Room', RoomSchema);

export default Room;
