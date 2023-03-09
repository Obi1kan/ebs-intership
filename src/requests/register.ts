import express from 'express';
import { User } from '../types/user';
import { mainAxios } from '../utils/axios-instance';
import dotenv from 'dotenv';
import { create_token } from '../utils/create-token';

dotenv.config();
const router = express.Router();
const secret = process.env.SECRET!;

router.post('/', async (req, res) => {
  let user: User = req.body;
  let users = (await mainAxios.get('/users')).data;
  await mainAxios.post('users', user);
  let token = create_token(user);
  res.json({ token });
});

export default router;
