import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let secret = process.env.SECRET!;
export function create_token(user: any) {
  let token = jwt.sign(
    {
      id: user.id,
      permission: user.permission,
      exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
    },
    secret
  );
  return token;
}
