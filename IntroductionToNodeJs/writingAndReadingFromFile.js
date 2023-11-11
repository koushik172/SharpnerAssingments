var http = require("http");
var fs = require("fs");

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html");

  let url = req.url;
  let method = req.method;

  if (url === "/") {
    let message = fs.readFileSync("messege.txt");
    let text = message.toString().split("+");
    text = text.join(" ");

    res.write("<html>");
    res.write("<head><title>Welcome to the Beginning</title></head>");
    res.write(`<h2>${text}</h2>`);
    res.write(
      "<body><form action='/message' method='POST' > <input type='text' name='message' ><button type='submit' >Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("messege.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.write("<html>");
  res.write("<head><title>Welcome to the Beginning</title></head>");
  res.write("<body><h1>Welcome to my Node Js project</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(4000);

console.log("http://localhost:4000");
