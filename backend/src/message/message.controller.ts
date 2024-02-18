import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';
import { UserInfo } from '../auth/decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guards';
import { SendMessageDto } from './dto/send-message.dto';
@ApiTags('메신저')
@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //message queue 생성하기
  @Get('new/:sendId')
  async createMessage(@UserInfo() userInfo: User, @Param() sendId: number) {
    return this.messageService.createMessage(userInfo.id, sendId);
  }

  //메세지 보내기
  @Post(':queue')
  async sendMessage(
    @Param('queue') queue: string,
    @UserInfo() userInfo: User,
    @Body() dto: SendMessageDto
  ) {
    console.log(queue);
    console.log(userInfo);
    console.log(dto);
    return this.messageService.sendMessage(queue, userInfo.id, dto);
  }

  //메세지 목록 가져오기
  @Get()
  async messageList(@UserInfo() userInfo: User) {
    return this.messageService.messageList(userInfo.id);
  }

  @Get(':queue')
  async receiveMessage(
    @Param('queue') queue: string,
    @UserInfo() userInfo: User
  ) {
    return await this.messageService.receiveMessage(queue, userInfo.id);
  }
}
