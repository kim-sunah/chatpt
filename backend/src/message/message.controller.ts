import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';
import { UserInfo } from '../auth/decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guards';

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
}
