import {faker} from '@faker-js/faker';

const userUrl = "http://localhost:3000/users";
let users = [];
fetch(userUrl)
    .then((response) => {
    return response.json();
  })
    .then((data) => {
    users = data;
    let lastId = data[data.length - 1].id + 1;
    for (let i = 0; i < 10; ++i){
        let newUser = {
            id: lastId,
            name: faker.name.fullName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            permission: faker.helpers.arrayElement(["admin", "user"]),
            adress: {
                street: faker.address.street(),
                suite: faker.helpers.arrayElement(["Suite ", "Apt "]) + faker.address.buildingNumber(),
                city: faker.address.cityName(),
                zipcode: faker.address.zipCode(),
                geo: {
                    lat: faker.address.latitude(),
                    lng: faker.address.longitude()
                }
            },
            phone: faker.phone.number(),
            website: faker.internet.domainName(),
            company: {
                name: faker.company.name(),
                catchPhrase: faker.company.catchPhrase(),
                bs: faker.company.bs()
            }
        }
        users.push(newUser);
        lastId++;
    }
  })