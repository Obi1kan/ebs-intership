import axios from 'axios'
import {faker} from '@faker-js/faker'
import { delay } from './utils/delay';

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

interface Adress{
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: Geo
}

interface Geo {
    lat: string,
    lng: string
}

interface Company {
    name: string,
    catchPhrase: string,
    bs: string
}

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    permission: string,
    adress: Adress,
    phone: string,
    website: string,
    company: Company
}

main();

async function main(){
    let lastId = await getId();
    let user = createUsers(lastId);
    postUsers(user);
}

async function getId(){
    let x = (await instance.get('/users')).data;
    return x[x.length - 1].id;
}

function createUsers(lastId: number){
    lastId++;
    let users = [];
    for (let i = 0; i < 10; i++){
        let newUser: User = {
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
    return users;
}

async function postUsers(users: Array<User>){
    for (let user of users){
        await instance.post(`/users`, user);
        await delay();
    }
}