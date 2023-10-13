let posts = [];
let lastActivityTime;

function createPost(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts.push(post);
      resolve(posts);
    }, 1000);
  });
}

function updateLastUserActivityTime() {
  return new Promise((resolve) => {
    setTimeout(() => {
      lastActivityTime = new Date();
      resolve(lastActivityTime);
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

// Usage
Promise.all([createPost("New Post"), updateLastUserActivityTime()])
  .then((values) => {
    console.log("Posts after creation:", values[0]);
    console.log("Last Activity Time:", values[1]);
    return deletePost();
  })
  .then((posts) => {
    console.log("Posts after deletion:", posts);
  })
  .catch((error) => {
    console.error(error);
  });
