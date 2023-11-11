const http = require("http");

const routes = require("./routes");

console.log(routes.text);
const server = http.createServer(routes);

server.listen(4000);

console.log("http://localhost:4000");
