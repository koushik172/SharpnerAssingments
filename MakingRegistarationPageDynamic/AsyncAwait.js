console.log("person1 : Ticket");
console.log("person2 : Ticket");

// Promise Code

const promiseBringTicktes = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Ticket");
  }, 3000);
});

const getPopcorn = promiseBringTicktes.then((t) => {
  console.log(`get popcorn`);
  return new Promise((resolve, reject) => {
    resolve(`${t} popcorn`);
  });
});

const getButter = getPopcorn.then((t) => {
  console.log("get butter");
  return new Promise((resolve, reject) => {
    resolve(`${t} butter`);
  });
});

const getColdDrink = getButter.then((t) => {
  console.log("get cold drink");
  return new Promise((resolve, reject) => {
    resolve(`${t} cold drink`);
  });
});

getColdDrink.then((t) => {
  console.log(t);
});

// Async Code

const preMovie = async () => {
  const promiseBringTicktes = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Ticket");
    }, 3000);
  });

  const getPopcorn = new Promise((resolve, reject) => {
    resolve(`Popcorn`);
  });

  const getButter = new Promise((resolve, reject) => {
    resolve(`Butter`);
  });

  const getColdDrink = new Promise((resolve, reject) => {
    resolve(`Cold Drink`);
  });

  let ticket;
  try {
    ticket = await promiseBringTicktes;
  } catch (e) {
    ticket = "No Ticket";
  }

  let popcorn = await getPopcorn;

  let butter = await getButter;

  let drink = await getColdDrink;

  let [pop, but, col] = await Promise.all([
    getPopcorn,
    getButter,
    getColdDrink,
  ]);

  console.log(`${pop}, ${but}, ${col}`);

  return ticket;
};

preMovie().then((m) => console.log(`person3 : ${m}`));

console.log("person4 : Ticket");
console.log("person5 : Ticket");

// Previous Assingment

let posts = [];

function createPost(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts.push(post);
      resolve(posts);
    }, 1000);
  });
}

function deletePost() {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts.pop();
      resolve(posts);
    }, 1000);
  });
}

async function editPosts() {
  await createPost("post 1");
  await createPost("post 2");
  console.log(posts);
  await deletePost();
  console.log(posts);
}

editPosts();
