import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// https://github.com/mguay22/nestjs-sockets/blob/master/socket-client/index.html

@WebSocketGateway()
export class MapGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('map')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }
}