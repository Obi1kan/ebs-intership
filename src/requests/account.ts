import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Token } from '../types/token';
import { mainAxios } from '../utils/axios-instance';

dotenv.config();
const router = express.Router();
const secret = process.env.SECRET!;

router.get('/', async (req, res) => {
  let token = req.headers.authorization!;
  let decoded = jwt.verify(token, secret) as Token;
  let id = +decoded.id;
  let users = (await mainAxios.get('users')).data;
  res.json(users[id - 1]);
});

router.patch('/', async (req, res) => {
  let token = req.headers.authorization!;
  let decoded = jwt.verify(token, secret) as Token;
  let id = +decoded.id;
  await mainAxios.patch(`users/${id}`, req.body);
  res.json(req.body);
});

export default router;
