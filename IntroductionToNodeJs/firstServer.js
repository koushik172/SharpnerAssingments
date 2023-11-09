var http = require("http");

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html");

  let url = req.url;

  if (url === "/node" || url === "/") {
    res.write("<html>");
    res.write("<head><title>Welcome to the Beginning</title></head>");
    res.write("<body><h1>Welcome to my Node Js project</h1></body>");
    res.write("</html>");
    res.end();
  } else if (url === "/home") {
    res.write("<html>");
    res.write("<head><title>Welcome to the Beginning</title></head>");
    res.write("<body><h1>Welcome Home</h1></body>");
    res.write("</html>");
    res.end();
  } else if (url === "/about") {
    res.write("<html>");
    res.write("<head><title>Welcome to the Beginning</title></head>");
    res.write("<body><h1>Welcome to About Us page</h1></body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(4000);

console.log("http://localhost:4000");
