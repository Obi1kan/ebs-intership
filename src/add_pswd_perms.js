import { faker } from '@faker-js/faker';

const userUrl = "http://localhost:3000/users";
let users = [];

async function updateData(users, userUrl) {
  for (let user of users) {
      let url = userUrl + `/${user.id}`
      await fetch(url, {
          method: 'PATCH',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
      });

      await new Promise(resolve => setTimeout(resolve, 100));
  }
}

fetch(userUrl)
    .then((response) => {
    return response.json();
  })
    .then(async (data) => {
    users = data;
    
    for (let user of users){
      user.password = faker.internet.password();
      user.permission = faker.helpers.arrayElement(["admin", "user"]);
    }
    
    console.log(users[1]);

    updateData(users, userUrl);
  })
