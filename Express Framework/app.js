import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("Comment 1");
  next();
});

app.use((req, res, next) => {
  console.log("Comment 2");
  res.send("<h1>Helloooo</h1>");
});

app.listen(3000);
console.log("http://localhost:3000");
