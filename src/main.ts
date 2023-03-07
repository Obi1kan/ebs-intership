import { mainAxios } from "./utils/axios-instance";
import { User } from "./types/user";

const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const server = jsonServer.create();
const router = jsonServer.router("src/db.json");
const middlewares = jsonServer.defaults();

server.use(bodyParser.json());
server.post("/login", async (req: any, res: any) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  let users = (await mainAxios.get("/users")).data;
  let result = users.find((element: User) => {
    if (element.username == username && element.password == password)
      return element;
  });
  if (result == undefined)
    res.status(404).send("Inccorect username or password");
  else res.json(result);
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
