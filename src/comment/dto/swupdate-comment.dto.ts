import { PickType } from '@nestjs/swagger';
import { UpdateCommentDto } from './update-comment.dto';

export class SwUpdateDto extends PickType(UpdateCommentDto, ['comment']) {}
