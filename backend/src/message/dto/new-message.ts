import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class NewMessageDto {
  @IsNumber()
  @IsNotEmpty({ message: '잘못된 전송' })
  host_id: number;
}
