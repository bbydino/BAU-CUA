import { io } from "socket.io-client";
import { API_ENDPOINT } from "./constants";

export const socket = io(API_ENDPOINT, {
  autoConnect: false,
});
