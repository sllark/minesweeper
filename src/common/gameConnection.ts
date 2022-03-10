const ENDPOINT = 'wss://hometask.eg1236.com/game1/';

class GameConnection {
  private static _socket: WebSocket;

  public static get socket() {
    return this._socket;
  }

  public static set socket(socketConnection: WebSocket) {
    this._socket = socketConnection;
  }

  public static createConnection() {
    if (GameConnection.socket) return GameConnection.socket;
    GameConnection.socket = new WebSocket(ENDPOINT);
    return GameConnection.socket;
  }

}

export default GameConnection;