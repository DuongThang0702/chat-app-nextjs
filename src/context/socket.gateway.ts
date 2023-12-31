import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_URL_SERVER_SOCKET!);
export const SocketContext = createContext(socket);
