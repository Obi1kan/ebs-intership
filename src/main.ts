import jsonServer from 'json-server';
import bodyParser from 'body-parser';
import auth from './requests/auth';
import account from './requests/account';
import perms from './requests/permission';

const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();

server.use(bodyParser.json());
server.use('/auth', auth);
server.use('/account', account);
server.use('/', perms);
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
