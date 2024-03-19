import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { User } from '@src/common/decorators/user.decorator';

@Controller('boards')
export class BoardsController {
  constructor() {}

  @Post()
  @UseGuards(JwtAccessTokenGuard)
  create(
    @User() userId: number,
    @Body() createBoardRequestBodyDto: CreateBoardRequestBodyDto,
  ) {}
}
