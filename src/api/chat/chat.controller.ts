import { decodeToken, getAccessTokenCookie } from '../../lib/token';


export async function getLobby(ctx: any) {
  const { uid } = ctx.params;
  const token = getAccessTokenCookie(ctx);

  // 토큰이 없으면 다음 작업을 진행한다.
  if (!token) {
    ctx.status = 401;
    
    return;         
  }

  try {
    const decoded: any = await decodeToken(token);

    if (uid !== decoded.uid) {
      ctx.status = 401;

      return;
    }

    console.log('썪쎾쓰');

   } catch (err) {
    ctx.status = 500;
  }

  // 체팅방 접속
}