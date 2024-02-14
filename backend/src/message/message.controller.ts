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

  @Get()
  async list(@UserInfo() userinfo: User) {
    return await this.messageService.list_gest(userinfo.id);
  }

  @Post(':hostId')
  async newMessage(
    @Param('hostId') hostId: number,
    @UserInfo() userId: number
  ) {
    return await this.messageService.newMessage(hostId, userId);
  }

  @Get('isRead')
  async isRead(@UserInfo() userinfo: User) {
    return await this.messageService.isRead(userinfo.id);
  }

  @Get(':queue')
  async messageText(@Param('queue') queue: number, @UserInfo() userinfo: User) {
    return await this.messageService.messageText(queue);
  }
  @Put(':queue')
  async sendMessage(
    @Param('queue') queue: number,
    @UserInfo() userinfo: User,
    @Body() body: SendMessageDto
  ) {
    return await this.messageService.sendMessage(
      userinfo.id,
      queue.toString(),
      body
    );
  }
}
