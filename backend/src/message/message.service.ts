import { Inject, Injectable, Scope, Request } from '@nestjs/common';
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

  async list_gest(userId: number) {
    const list = await this.messageRepository
      .createQueryBuilder('m')
      .where('m.gest_id = :id OR m.host_id = :id', { id: userId })
      .leftJoinAndSelect('m.host', 'host')
      .leftJoinAndSelect('m.gest', 'gest')
      .getMany();

    return { list: list, userId: userId };
  }

  async newMessage(hostId: number, userId: number) {
    const message = '안녕하세요 반갑습니다!';
    const createMessage = await this.messageRepository.save({
      host_id: hostId,
      gest_id: userId,
      last_message: message,
    });
    try {
      await this.messageRepository.save(createMessage);
      var queue = createMessage.id.toString();
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
      return true;
    } catch (err) {
      console.log(err);
      throw new Error('메세지전송에 실패하였습니다.');
    }
  }

  async isRead(id: number) {
    try {
      const role = (await this.userRepository.findOne({ where: { id: id } }))
        .authority;
      const sumField = role === 'User' ? 'gest_count' : 'host_count';
      const whereField = role === 'User' ? 'gest_id' : 'host_id';

      const sumResult = await this.messageRepository
        .createQueryBuilder('m')
        .select(`SUM(m.${sumField})`, 'sum')
        .where(`m.${whereField} = :id`, { id })
        .getRawOne();

      return { isRead: sumResult.sum > 0 ? true : false };
    } catch (err) {
      throw new Error('메세지를 가져오지 못했습니다');
    }
  }

  async sendMessage(
    userId: number,
    queue: string,
    body: SendMessageDto
  ): Promise<void> {
    try {
      await this.messageRepository.update(queue, {
        last_message: body.message,
      });

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
          channel.sendToQueue(queue, Buffer.from(body.message));
        });
      });
      this.event.sendMessage('sendMessage');
      this.receiveMessage(queue);
    } catch (err) {
      console.log(err);
      throw new Error('메세지전송에 실패하였습니다.');
    }
  }

  async receiveMessage(queue: string) {
    try {
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

          channel.consume(
            queue,
            function (msg) {
              console.log(' [x] Received %s', msg.content.toString());
            },
            {
              noAck: true,
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
      throw new Error('메세지를 가져오는데에 실패하였습니다.');
    }
  }
}
