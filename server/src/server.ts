import * as dgram from "dgram";
import { AddressInfo } from "net";
import express from "express";
import { createServer } from "http";
import * as socketio from "socket.io";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = createServer(app);
let io = socketio.default(http);

const COMMAND_PORT = 8889;
const VIDEO_PORT = 11111;
const HOST = "192.168.10.1";
const drone = dgram.createSocket("udp4");
drone.bind(COMMAND_PORT);

const videoStream = dgram.createSocket("udp4");
videoStream.bind(VIDEO_PORT);

videoStream.on("message", (msg, rinfo) => {
  console.log(`stream got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

drone.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  drone.close();
});

drone.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

drone.on("listening", () => {
  const address = drone.address() as AddressInfo;
  console.log(`server listening ${address.address}:${address.port}`);
});

io.on("connection", function(socket: socketio.Socket) {
  console.log("a user connected");
  socket.emit("status", "CONNECTED");
});

function handleError(err: Error | null) {
  if (err) {
    console.log("ERROR");
    console.log(err);
  }
}

http.listen(6767, () => {
  console.log('Server running on 6767')
})

// drone.send("command", 0, 7, COMMAND_PORT, HOST, handleError);
// drone.send("battery?", 0, 8, COMMAND_PORT, HOST, handleError);
// drone.send("streamon", 0, 8, COMMAND_PORT, HOST, handleError);
// setTimeout(() => drone.send("streamoff", 0, 9, COMMAND_PORT, HOST, handleError), 5000);
