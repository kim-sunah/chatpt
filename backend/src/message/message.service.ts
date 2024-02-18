import {
  Inject,
  Injectable,
  Scope,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { User } from 'src/entities/user.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { EventsGateway } from 'src/events/events.gateway';

var amqp = require('amqplib/callback_api');
const url =
  'amqps://chatPT:chatPT123456@b-e4d218f5-5560-4786-b2bc-f3185dca9ce3.mq.ap-northeast-2.amazonaws.com:5671';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(REQUEST) private readonly req: Request,
    private readonly event: EventsGateway
  ) {}

  async createMessage(userId: number, sendId: number) {
    try {
      //db에 저장
      const isMessage = await this.messageRepository.findOne({
        where: [
          { queue: `${userId}-${sendId}` },
          { queue: `${sendId}-${userId}` },
        ],
      });
      if (!isMessage) {
        const message = '안녕하세요 반갑습니다!';
        //메세지 저장
        await this.messageRepository.save({
          queue: `${userId}-${sendId}`,
          gest_id: userId,
          host_id: sendId,
          send_user: sendId,
          message: message,
        });

        //큐 생성
        var queue = `${userId}-${sendId}`;

        amqp.connect(url, function (error0, connection) {
          if (error0) {
            throw error0;
          }
          connection.createChannel(function (error1, channel) {
            if (error1) {
              throw error1;
            }

            channel.assertQueue(queue, {
              durable: false,
            });

            //메세지 보내기
            channel.sendToQueue(queue, Buffer.from(message));
          });
        });
      }
      this.event.createMessage('createMessage');
      return {
        status: 200,
      };
    } catch (err) {
      console.log(err);
      throw new Error('메세지전송에 실패하였습니다.');
    }
  }

  async sendMessage(queue: string, userId: number, body: SendMessageDto) {
    console.log('queue:{}', queue);
    const message = await this.messageRepository.findOne({
      where: { queue: queue },
    });
    //새로운 메세지 db에 저장
    const new_message = await this.messageRepository.save({
      queue: queue,
      gest_id: message.gest_id,
      host_id: message.host_id,
      send_user: userId,
      message: body.message,
    });

    //queue에 메세지 전송
    amqp.connect(url, function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false,
        });

        //메세지 보내기
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(new_message)));
        this.event.createMessage('createMessage');
      });
    });

    return { status: 200 };
  }

  //나의 메세지 목록 가져오기
  async messageList(userId: number) {
    //메세지를 송신받았을 때와 수신받았을 때 전부 포함해서 가져와야함
    const messages = await this.messageRepository
      .createQueryBuilder('m')
      .select('m.queue,m.created_at, m.host_id, m.gest_id')
      .addSelect('SUM(m.is_read)', 'sum')
      .leftJoinAndSelect('m.host', 'host')
      .leftJoinAndSelect('m.gest', 'gest')
      .where('m.queue LIKE :prefix1', { prefix1: `%-${userId}` })
      .orWhere('m.queue LIKE :prefix2', { prefix2: `${userId}-%` })
      .groupBy('m.queue')
      .getRawMany();

    console.log(messages);
    return { status: 200, messages: messages };
  }

  async receiveMessage(queue: string, userId: number) {
    try {
      const message = await this.messageRepository.find({
        where: { queue: queue },
      });
      console.log(message);

      return { message: message, userId: userId };
    } catch (err) {
      console.log(err);
      throw new Error('메세지를 가져오는데에 실패하였습니다.');
    }
  }
}
