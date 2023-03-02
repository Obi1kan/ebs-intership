import { faker } from '@faker-js/faker';

const userUrl = "http://localhost:3000/users";
let users = [];
fetch(userUrl)
    .then((response) => {
    return response.json();
  })
    .then((data) => {
    users = data;
    for (let i = 0; i < users.length; i++){
        users[i].password = faker.internet.password();
        users[i].permission = faker.helpers.arrayElement(["admin", "user"]);
    }
  })
