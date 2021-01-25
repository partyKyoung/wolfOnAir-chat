import { model, Document, Model, Schema } from "mongoose";

interface LobbyDocument extends Document {
  _id: string;
  currentCount: number;
  maxCount: number;
  lobbyNo: number;
}

const RoomSchema = new Schema({
  currentCount: Number, // 현재 입장 수
  maxCount: Number, // 최대 입장 수
  lobbyNo: Number
});

const Lobby: Model<LobbyDocument>  = model('Lobby', RoomSchema);

export default Lobby;
