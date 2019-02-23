import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { SERVER } from "./constants";

export function SocketStatus() {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const socket = openSocket(SERVER);
    console.log(socket)
    socket.on("status", ( status:string ) => setConnectionStatus(status.toLowerCase()));
  }, []);

  return <p style={{textTransform: 'capitalize'}}>{connectionStatus}</p>;
}
