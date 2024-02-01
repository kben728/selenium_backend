const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// This will serve as the current URL state
let currentUrl = "https://www.example.com";

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send the initial URL to the client
  ws.send(JSON.stringify({ event: "url-updated", data: currentUrl }));

  // Listen for messages from the client (if needed)
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
});

// Endpoint to update the URL
app.post("/update-url", (req, res) => {
  const newUrl = req.query.url; // Assuming you pass the new URL as a query parameter
  if (newUrl) {
    currentUrl = newUrl;

    // Broadcast the updated URL to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: "url-updated", data: currentUrl }));
      }
    });

    res.json({ success: true, message: "URL updated successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid URL provided" });
  }
});

// Start the HTTP server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
