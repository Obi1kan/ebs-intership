import axios from 'axios';
import { faker } from '@faker-js/faker';
import { delay } from '../utils/delay';
import { mainAxios } from '../utils/axios-instance';
import { User } from '../types/user';
main();

async function main() {
  let lastId = await getId();
  let users = createUsers(lastId);
  postUsers(users);
}

async function getId() {
  let x = (await mainAxios.get('/users')).data;
  return x[x.length - 1].id;
}

function createUsers(lastId: number) {
  lastId++;
  let users: Array<User> = [...Array(10)].map((_, index) => ({
    id: lastId + index,
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    permission: faker.helpers.arrayElement(['admin', 'user']),
    adress: {
      street: faker.address.street(),
      suite:
        faker.helpers.arrayElement(['Suite ', 'Apt ']) +
        faker.address.buildingNumber(),
      city: faker.address.cityName(),
      zipcode: faker.address.zipCode(),
      geo: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    phone: faker.phone.number(),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    },
  }));
  return users;
}

async function postUsers(users: Array<User>) {
  for (let user of users) {
    await mainAxios.post(`/users`, user);
    await delay(100);
  }
}
