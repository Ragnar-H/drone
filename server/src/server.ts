import * as dgram from "dgram";
import { AddressInfo } from "net";

const PORT = 8889;
const HOST = "192.168.10.1";
const drone = dgram.createSocket("udp4");
drone.bind(PORT);

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

function handleError(err: Error | null) {
  if (err) {
    console.log("ERROR");
    console.log(err);
  }
}

drone.send("command", 0, 7, PORT, HOST, handleError);
drone.send("battery?", 0, 8, PORT, HOST, handleError);
