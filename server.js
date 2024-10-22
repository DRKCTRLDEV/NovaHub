const express = require('express');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const { createBareServer } = require('@tomphttp/bare-server-node');
const http = require('http');
const path = require('path');

const app = express();
const httpServer = http.createServer();

// Create bare server
const bareServer = createBareServer('/bare/');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve Ultraviolet files
app.use('/uv/', express.static(uvPath));

// Handle requests
httpServer.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

// Handle upgrades
httpServer.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

httpServer.listen(3000, () => {
  console.log('Server listening on port 3000');
});
