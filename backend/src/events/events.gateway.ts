import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('findAlluser')
  finduserAll(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }

  @SubscribeMessage('findAllproduct')
  findproductAll(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }

  @SubscribeMessage('Deleteproduct')
  Deleteproduct(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }

  @SubscribeMessage('GetwishList')
  GetwishList(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }
  @SubscribeMessage('UnwishList')
  UnwishList(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }

  @SubscribeMessage('createcomment')
  createcomment(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }
  @SubscribeMessage('updatgecomment')
  updatgecomment(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }

  @SubscribeMessage('deletecomment')
  deletecomment(@MessageBody() message: string): void {
    this.server.emit('events', message);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
