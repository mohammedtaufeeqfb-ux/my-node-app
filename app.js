const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  res.end("🔥 Version 2 from DevOps Pipeline!");
});

server.listen(3000, () => {
  console.log("Server running...");
});
