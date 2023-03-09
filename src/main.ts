import jsonServer from 'json-server';
import dotenv from 'dotenv';
import register from './requests/register';
import login from './requests/login';
import bodyParser from 'body-parser';

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();
const secret = process.env.SECRET!;

server.use(bodyParser.json());
server.use('/login', login);
server.use('/register', register);
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
