import axios from 'axios'
import {faker} from '@faker-js/faker'
const instance = axios.create({
    baseURL: "http://localhost:3000/"
})

main();

async function main(){
    let users = await getUsers();
    let updateUsers = updateUsersPassword(users);
    await saveUsers(updateUsers);
}

async function getUsers(){
    return (await instance.get('/users')).data;
}

function updateUsersPassword(users: any){
    for (let user of users){
        user.password = faker.internet.password();
        user.permission = faker.helpers.arrayElement(["admin", "user"]);
    }
    return users;
}

async function saveUsers(users: any){
    for (let user of users){
        await instance.patch(`/users/${user.id}`, {
            password: user.password,
            permission: user.permission
        });
    }
}