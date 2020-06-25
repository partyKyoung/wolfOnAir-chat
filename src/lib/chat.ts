import Lobby from '../schemas/lobby';

// 로비를 생성한다.
async function makeLobby() {
  const newLobby = new Lobby({});

  await newLobby.save();

  return newLobby._id
}

// 로비 Id를 반환한다.
export async function getLobby() {
  const lobby = await Lobby.find();
  let lobbyId = '';

  if (lobby.length <= 0) {
    lobbyId = await makeLobby(); 
  } else {
    lobbyId = lobby[0]._id;
  }

  return lobbyId;
}