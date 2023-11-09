var http = require("http");

const server = http.createServer(function (req, res) {
  res.write("Koushik Rajbanhi");
  res.end();
});

server.listen(4000);
