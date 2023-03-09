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
  else res.status(403).send('Acces denied');
});

router.get('/users', (req, res) => {
  res.send('Succes');
});

export default router;
