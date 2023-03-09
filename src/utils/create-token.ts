import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../types/user';

dotenv.config();
let secret = process.env.SECRET!;
export function createToken(user: User) {
  let token = jwt.sign(
    {
      id: user.id,
      permission: user.permission,
    },
    secret,
    { expiresIn: '1d' }
  );
  return token;
}
