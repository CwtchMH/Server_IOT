const WebSocket = require('ws');

let wss;

function initializeWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

function broadcast(data) {
  if (!wss || !wss.clients) {
    console.error("WebSocket server or clients not initialized");
    return;
  }

  const message = typeof data === 'string' ? data : JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
        console.log("WebSocket message sent:", data);
      } catch (error) {
        console.error("Error sending message to client:", error);
      }
    }
  });

  console.log("Total WebSocket clients:", wss.clients.size);
}

module.exports = { initializeWebSocket, broadcast };