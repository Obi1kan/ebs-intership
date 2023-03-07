import express from 'express';
import { User } from '../types/user';
import bodyParser from 'body-parser';
import { mainAxios } from '../utils/axios-instance';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const secret = process.env.SECRET!;

router.use(bodyParser.json());

router.post('/', async (req, res) => {
  let user: User = req.body;
  let users = (await mainAxios.get('/users')).data;
  await mainAxios.post('users', user);
  let token = jwt.sign(
    {
      id: user.id,
      permission: user.permission,
      exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
    },
    secret
  );
  res.json({ token });
});

export default router;
