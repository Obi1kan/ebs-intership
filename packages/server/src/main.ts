import jsonServer from 'json-server';
import bodyParser from 'body-parser';
import auth from './requests/auth';
import account from './requests/account';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const port = process.env.PORT;
const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(bodyParser.json());
server.use('/auth', auth);
server.use('/account', account);
server.use(middlewares);
server.use(router);
server.listen(3002, () => {
  console.log('JSON Server is running');
});
