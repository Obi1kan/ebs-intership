import axios from "axios";
import { faker } from "@faker-js/faker";
import { mainAxios } from "./utils/axios-instance";

interface Adress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  permission: string;
  adress: Adress;
  phone: string;
  website: string;
  company: Company;
}

main();

async function main() {
  let users = await getUsers();
  let updateUsers = updateUsersPassword(users);
  await saveUsers(updateUsers);
}

async function getUsers() {
  return (await mainAxios.get("users")).data;
}

function updateUsersPassword(users: Array<User>) {
  for (let user of users) {
    user.password = faker.internet.password();
    user.permission = faker.helpers.arrayElement(["admin", "user"]);
  }
  return users;
}

async function saveUsers(users: Array<User>) {
  for (let user of users) {
    await mainAxios.patch(`users/${user.id}`, {
      password: user.password,
      permission: user.permission,
    });
  }
}
