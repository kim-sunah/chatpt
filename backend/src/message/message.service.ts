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
import { BadwordService } from 'src/badword/badword.service';

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
    private readonly event: EventsGateway,
    private readonly badwordService: BadwordService
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
          send_user: sendId,
          message: message,
        });

        //큐 생성
        var queue = `${userId}-${sendId}`;

        amqp.connect(url, function (error0, connection) {
          if (error0) {
            throw error0;
          }
          connection.createChannelß(function (error1, channel) {
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
      return {
        status: 200,
      };
    } catch (err) {
      console.log(err);
      throw new Error('메세지전송에 실패하였습니다.');
    }
  }

  async sendMessage(queue: string, userId: number, body: SendMessageDto) {
    try {
      const badwords = await this.badwordService.searchBadword(body.message);
      if (badwords.length)
        throw new BadRequestException(
          '적절하지 못한 단어가 들어있습니다: ' +
            badwords.map((badword) => badword[1][0]).join(', ')
        );

      //새로운 메세지 db에 저장
      await this.messageRepository.save({
        queue: queue,
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
          channel.sendToQueue(queue, Buffer.from(body.message));
        });
      });

      this.event.sendMessage('sendMessage');

      return { status: 200 };
    } catch (err) {
      throw new Error('메세지전송에 실패하였습니다.');
    }
  }

  //나의 메세지 목록 가져오기
  async messageList(userId: number) {
    //메세지를 송신받았을 때와 수신받았을 때 전부 포함해서 가져와야함
    const messages = await this.messageRepository
      .createQueryBuilder('m')
      .where('m.queue LIKE :prefix1', { prefix1: `%-${userId}` })
      .orWhere('m.queue LIKE :prefix2', { prefix2: `${userId}-%` })
      .groupBy('m.queue')
      .getMany();

    return { status: 200, messages: messages };
  }

  //읽지 않은 메세지

  async list_gest(userId: number) {
    const list = await this.messageRepository
      .createQueryBuilder('m')
      .where('m.gest_id = :id OR m.host_id = :id', { id: userId })
      .leftJoinAndSelect('m.host', 'host')
      .leftJoinAndSelect('m.gest', 'gest')
      .getMany();

    return { list: list, userId: userId };
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

  async receiveMessage(queue: string, userId: number) {
    try {
      const message = await this.messageRepository.findOne({
        where: { id: +queue },
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

          channel.prefetch(1);

          channel.consume(
            queue,
            function (msg) {
              // console.log(' [x] Received %s', msg.content.toString());
            },
            {
              noAck: true,
            }
          );
        });
      });
      return { message: message, userId: userId };
    } catch (err) {
      console.log(err);
      throw new Error('메세지를 가져오는데에 실패하였습니다.');
    }
  }
}
