import React, { useState, useEffect } from "react";
import { socket } from "./socket";

export function SocketStatus() {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    socket.on("status", (status: string) =>
      setConnectionStatus(status.toLowerCase())
    );
  }, []);

  return <p style={{ textTransform: "capitalize" }}>{connectionStatus}</p>;
}
