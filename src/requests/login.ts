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
  const username: string = req.body.username;
  const password: string = req.body.password;
  let users = (await mainAxios.get('/users')).data;
  let result = users.find((element: User) => {
    if (element.username == username && element.password == password)
      return element;
  });
  if (result == undefined)
    res.status(404).json({ message: 'Incorrect username or password' });
  else {
    let token = jwt.sign(
      {
        id: result.id,
        permission: result.permission,
        exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
      },
      secret
    );
    res.json({ token });
  }
});

export default router;
