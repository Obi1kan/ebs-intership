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
  let id = decoded.id;
  let user = (await mainAxios.get(`users/${id}`)).data;
  res.json(user);
});

router.patch('/', async (req, res) => {
  let token = req.headers.authorization!;
  let decoded = jwt.verify(token, secret) as Token;
  let id = decoded.id;
  let user = (await mainAxios.patch(`users/${id}`, req.body)).data;
  res.json(user);
});

export default router;
