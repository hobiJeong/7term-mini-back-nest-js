import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { BoardLovesService } from '@src/apis/board-loves/services/board-loves.service';
import { User } from '@src/common/decorators/user.decorator';
import { InternalServerErrorSwaggerBuilder } from '@src/common/dto/internal-server-error.builder';
import { ParsePositiveIntPipe } from '@src/common/pipes/parse-positive-int.pipe';

@InternalServerErrorSwaggerBuilder()
@Controller('boards/:boardId/board-loves')
export class BoardLovesController {
  constructor(private readonly boardLovesService: BoardLovesService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessTokenGuard)
  create(
    @Param('boardId', ParsePositiveIntPipe) boardId: number,
    @User() user: Payload,
  ) {
    return this.boardLovesService.create(user.id, boardId);
  }
}
