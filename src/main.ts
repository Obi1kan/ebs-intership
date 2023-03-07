import { mainAxios } from "./utils/axios-instance";
import { User } from "./types/user";
import jsonServer from "json-server";
import jwt from "jsonwebtoken";
require("dotenv").config();

const bodyParser = require("body-parser");
const server = jsonServer.create();
const router = jsonServer.router("src/db.json");
const middlewares = jsonServer.defaults();
const secret: string = process.env.SECRET!;

server.use(bodyParser.json());
server.post("/login", async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  let users = (await mainAxios.get("/users")).data;
  let result = users.find((element: User) => {
    if (element.username == username && element.password == password)
      return element;
  });
  if (result == undefined)
    res.status(404).json({ message: "Incorrect username or password" });
  else {
    let token = jwt.sign(
      {
        username: `${username}`,
        password: `${password}`,
        permission: `${result.permission}`,
        exp: 2000000,
      },
      secret
    );
    res.send(`${token}`);
  }
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
