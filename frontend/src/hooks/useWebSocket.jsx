import { BACKEND_WS_ENDPOINT } from "../config.jsx";

const useWebSocket = () => {
  const socket = new WebSocket(BACKEND_WS_ENDPOINT);
  socket.handlerChain = {};
  socket.addEventListener("message", (ev) => {
    for (const [_, handler] of Object.entries(socket.handlerChain)) {
      handler(ev.data);
    }
  });

  return socket;
};

export default useWebSocket;
