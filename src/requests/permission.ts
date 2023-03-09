import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Token } from '../types/token';
import { mainAxios } from '../utils/axios-instance';

dotenv.config();
const secret = process.env.SECRET!;
const router = express.Router();

router.use('/users', (req, res, next) => {
  let token = req.headers.authorization!;
  let decoded = jwt.verify(token, secret) as Token;
  if (decoded.permission == 'admin') next();
  else res.status(403).json({ message: 'Acces denied' });
});

router.post('/posts', async (req, res, next) => {
  let token = req.headers.authorization!;
  if (token == null) res.status(401).json({ message: 'unauthenticated' });
  else {
    let decoded = jwt.verify(token, secret) as Token;
    req.body.userId = decoded.id;
    next();
  }
});

router.patch('/posts/:id', async (req, res, next) => {
  let token = req.headers.authorization!;
  if (token == null) res.status(401).json({ message: 'unauthenticated' });
  else {
    let decoded = jwt.verify(token, secret) as Token;
    if (decoded.permission == 'admin') next();
    else {
      let data = (await mainAxios.get(`${req.path}`)).data;
      if (decoded.id == data.userId) next();
      else res.status(403).json({ message: 'Acces denied' });
    }
  }
});

router.delete('/posts/:id', async (req, res, next) => {
  if (req.headers.authorization == null)
    res.status(401).json({ message: 'unauthenticated' });
  else {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, secret) as Token;
    if (decoded.permission == 'admin') next();
    else {
      let data = (await mainAxios.get(`${req.path}`)).data;
      if (decoded.id == data.userId) next();
      else res.status(403).json({ message: 'Acces denied' });
    }
  }
});

export default router;
