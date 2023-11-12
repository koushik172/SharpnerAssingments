import fs from "fs";

import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.write(
    `<form onsubmit='localStorage.setItem("username", document.getElementById("username").value)' action='/login' method='POST'>
        <p>Username</p>
        <input type='text' id='username' name='username'>
        <button type='submit'>Login</button>
    </form>`
  );
  res.end();
});

app.post("/login", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.txt"));
  let messages = "";
  data.forEach((item, index) => {
    for (let key in item) {
      messages += key + ": " + item[key] + " | ";
    }
  });
  res.write(`<h2>${messages}</h2>`);
  res.write(
    `<form action='/' onsubmit="document.getElementById('messageInput').name = localStorage.getItem('username')" method='POST'>
        <p>Message</p>
        <input id="messageInput" type='text' name='message'>
        <button type='submit'>Send</button>
    </form>`
  );
  res.end();
});

app.post("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.txt"));
  data.push(req.body);
  fs.writeFileSync("data.txt", JSON.stringify(data));
  res.redirect("/");
});

app.listen(3000);
console.log("http://localhost:3000/login");
