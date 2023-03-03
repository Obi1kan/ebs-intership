import axios from 'axios'
import {faker} from '@faker-js/faker'

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

main();

async function main(){
    let [userId, postId] = await getId()
    let newPosts = createPosts(userId, postId);
    await updatePosts(newPosts);
}

async function getId(){
    let x = (await instance.get('/posts')).data;
    let userId = x[x.length - 1].userId;
    let postId = x[x.length - 1].id;
    return [userId, postId]
}

function createPosts(userId: number, postId: number){
    let posts = [];
    userId++;
    postId++;

    for (let i = 0; i < 10; i++){
        let newPost = {
            userId,
            id: postId,
            title: faker.lorem.words(3),
            body: faker.lorem.sentences(4, '\n')
        }
        posts.push(newPost);
        postId++;
    }
    return posts;
}

async function updatePosts(posts: any){
    for (let post of posts){
        await instance.post('/posts', post);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}