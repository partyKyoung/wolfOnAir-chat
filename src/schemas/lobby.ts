import mongoose from 'mongoose';

interface Lobby extends mongoose.Document {}

const { model, Schema } = mongoose;
const lobbySchema = new Schema({});

export default model<Lobby>('Lobby', lobbySchema);