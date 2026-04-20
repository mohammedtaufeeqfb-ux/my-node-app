const http = require("http");

const server = http.createServer((req, res) => {
  res.end("🚀 New Change DevOps Pipeline!");
});

server.listen(3000, () => {
  console.log("webhook test");
});
