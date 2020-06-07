import jwt from 'jsonwebtoken';
import { Context } from 'koa';

import secret from '../config/jwtConfig';

export const decodeToken = (token: string) => {
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

export const getAccessTokenCookie = (ctx: Context): string => {
  const token = ctx.cookies.get('access_token');

  if (!token) {
    return '';
  }

  return token
}
