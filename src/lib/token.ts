import jwt from 'jsonwebtoken';
import { Context } from 'koa';

import secret from '../config/jwtConfig';

export function decodeToken(token: string) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject();
    }
    
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }

      resolve(decoded);
    })
  });
};

export function getAccessTokenCookie(ctx: Context) {
  const token = ctx.cookies.get('access_token');

  if (!token) {
    return '';
  }

  return token
}