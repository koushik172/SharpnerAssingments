import path from "path";
import rootDirectory from "../helper/path.js";

export const getSuccess = (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "success.html"));
};
