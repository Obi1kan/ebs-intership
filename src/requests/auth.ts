import express from 'express';
import { mainAxios } from '../utils/axios-instance';
import { create_token } from '../utils/create-token';
import { User } from '../types/user';

const router = express.Router();

router.post('/login', async (req, res) => {
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

router.post('/register', async (req, res) => {
  let user: User = req.body;
  await mainAxios.post('users', user);
  let token = create_token(user);
  res.json({ token });
});

export default router;
