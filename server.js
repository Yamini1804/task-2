const WebSocket = require("ws");
const PORT = 8080;

const server = new WebSocket.Server({ port: PORT });
console.log(`WebSocket server is running on ws://localhost:${PORT}`);

let clients = [];

server.on("connection", (socket) => {
  console.log("New client connected");
  clients.push(socket);

  // Handle incoming messages
  socket.on("message", (message) => {
    console.log("Received: ", message);
    // Broadcast to all clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  socket.on("close", () => {
    console.log("Client disconnected");
    clients = clients.filter((client) => client !== socket);
  });
});
