import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let secret = process.env.SECRET!;
export function createToken(user: any) {
  let token = jwt.sign(
    {
      id: user.id,
      permission: user.permission,
    },
    secret,
    { expiresIn: '2d' }
  );
  return token;
}
