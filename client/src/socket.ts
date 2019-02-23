import openSocket from "socket.io-client";
import { SERVER } from "./constants";
export const socket = openSocket(SERVER);
