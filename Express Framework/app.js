import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'> <input type='text' name='title'> <input type='number' name='size'> <button type='submit'>Add Product</button> </form>"
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body.title, req.body.size);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Helloooo</h1>");
});

app.listen(3000);
console.log("http://localhost:3000");
