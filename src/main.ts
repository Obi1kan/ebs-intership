import jsonServer from 'json-server';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import auth from './requests/auth';

const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

server.use(bodyParser.json());
server.use('/auth', auth);
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
