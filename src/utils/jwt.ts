import * as jwt from 'jsonwebtoken';

export type JWTAuthTokenPayload = {
  userId: string;
};

type UserPayload = {
  userId: string;
};

export const generateUserToken = (payload: JWTAuthTokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP || '24h',
  });
};

export const decodeToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
};
