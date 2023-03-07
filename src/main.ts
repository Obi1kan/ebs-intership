import { mainAxios } from "./utils/axios-instance";
import { User } from "./types/user";
import jsonServer from "json-server";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

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
        id: result.id,
        permission: result.permission,
        exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
      },
      secret
    );
    res.json({ token });
  }
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
