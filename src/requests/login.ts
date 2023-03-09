import express from 'express';
import { User } from '../types/user';
import { mainAxios } from '../utils/axios-instance';
import dotenv from 'dotenv';
import { create_token } from '../utils/create-token';

dotenv.config();
const router = express.Router();
const secret = process.env.SECRET!;

router.post('/', async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  let users = (await mainAxios.get('/users')).data;
  let result = users.find((element: User) => {
    if (element.username == username && element.password == password)
      return element;
  });
  if (result == undefined)
    res.status(400).json({ message: 'Incorrect username or password' });
  else {
    let token = create_token(result);
    res.json({ token });
  }
});

export default router;
