const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  res.end(`🚀 Response from POD: ${os.hostname()}`);
});

server.listen(3000, () => {
  console.log("Server running...");
});
