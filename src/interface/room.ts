export interface RoomInterface {
  currentCount: number; // 현재 입장 수
  maxCount: number; // 최대 입장 수
  roomTitle: string; // 방이름
  roomStatus: 'wating' | 'full' | 'playing' // 상태
  roomMode: 'wareWolf' // 게임 모드
}