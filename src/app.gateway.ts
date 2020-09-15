import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as dotenv from 'dotenv';

dotenv.config();

const portWs:number = parseInt(process.env.WS_PORT);

@WebSocketGateway(portWs, { transport: ['websocket'] })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('ApiGateway')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server){
    this.logger.log('WS Initialized!');
  }

  handleDisconnect(client: Socket){
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]){
    this.logger.log(`Client connected: ${client.id}`);
  }

  emitActionData<T>(type: string, action: string, data: T){
    const payload = {
      type,
      action,
      data
    };

    this.wss.emit(type, payload);
  }

}
