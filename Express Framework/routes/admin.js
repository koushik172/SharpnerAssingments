import express from "express";

const adminRoutes = express.Router();

adminRoutes.get("/add-product", (req, res, next) => {
  res.send(
    "<form action='/admin/product' method='POST'> <input type='text' name='title'> <input type='number' name='size'> <button type='submit'>Add Product</button> </form>"
  );
});

adminRoutes.post("/product", (req, res, next) => {
  console.log(req.body.title, req.body.size);
  res.redirect("/");
});

export default adminRoutes;
