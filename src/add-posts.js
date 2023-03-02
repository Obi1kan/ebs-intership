import {faker} from "@faker-js/faker"

const postUrl = "http://localhost:3000/posts"
let posts = [];

async function postPosts(posts, postUrl) {
    for (let post of posts) {
        await fetch(postUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });

        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

fetch(postUrl)
    .then((response) => response.json())
    .then((data) => {
        posts = data;
        let userId = data[data.length - 1].userId + 1,
            id = data[data.length - 1].id + 1;
        for (let i = 0; i < 10; i++){
            let newPost = {
                userId,
                id,
                title: faker.lorem.words(3),
                body: faker.lorem.sentences(4, '\n')
            }
            posts.push(newPost);
            id++;
        }
        
        postPosts(posts, postUrl);

    })