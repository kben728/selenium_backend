# WebSocket Server Readme

This repository contains a WebSocket server implemented in Node.js using Express and the ws library. This server allows real-time communication with clients and provides functionality to update and broadcast a current URL state. Below are instructions on how to use, the available endpoints, and WebSocket events.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the server:

   ```bash
   npm start
   ```

   The server will start on port 3000.

## WebSocket Events

### Event: `url-updated`

- **Description:** Notifies clients about the updated URL state.
- **Data Format:** `{ event: "url-updated", data: "<new-url>" }`

## HTTP Endpoints

### Endpoint: `POST /update-url`

- **Description:** Updates the current URL state and broadcasts it to all connected clients.
- **Query Parameters:**
  - `url` (string): The new URL to set as the current state.
- **Request Format:** `POST /update-url?url=<new-url>`
- **Response Format:**
  - Success: `{ success: true, message: "URL updated successfully" }`
  - Failure: `{ success: false, message: "Invalid URL provided" }`

## WebSocket Usage

1. Connect to the WebSocket server:

   ```javascript
   const ws = new WebSocket("ws://localhost:3000");
   ```

2. Listen for the initial URL state:

   ```javascript
   ws.onmessage = (event) => {
     const data = JSON.parse(event.data);
     if (data.event === "url-updated") {
       console.log("Current URL:", data.data);
     }
   };
   ```

3. Send messages to the server (optional):

   ```javascript
   ws.send("Hello, Server!");
   ```

   The server logs received messages to the console.

4. Update the URL using the HTTP endpoint:

   ```bash
   curl -X POST "http://localhost:3000/update-url?url=https://www.newurl.com"
   ```

   This will update the URL for all connected WebSocket clients.
