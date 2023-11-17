import path from "path";
import rootDirectory from "../helper/path.js";

export const getContact = (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "contact-us.html"));
};

export const postContact = (req, res, next) => {
  console.log(req.body.name, req.body.email);
  res.redirect("/success");
};
