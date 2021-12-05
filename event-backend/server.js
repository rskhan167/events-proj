import http from "http";
import {
  getEvents,
  createEvent,
  editEvent,
} from "./controllers/eventController.js";

const server = http.createServer((req, res) => {
  if (req.url === "/api/events" && req.method === "GET") {
    getEvents(req, res);
  } else if (req.url.match(/\/api\/event\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    editEvent(req, res, id);
  } else if (req.url === "/api/event" && req.method === "POST") {
    createEvent(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;
