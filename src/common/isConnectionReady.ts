import GameConnection from "./gameConnection";

const isConnectionReadyReady = (): boolean => GameConnection.socket && !!GameConnection.socket.readyState;

export default isConnectionReadyReady;