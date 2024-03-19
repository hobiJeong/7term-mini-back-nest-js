import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { CreateUserRequestBodyDto } from '@src/apis/users/dto/create-user-request-body.dto';
import { UserDto } from '@src/apis/users/dto/user.dto';
import { UsersService } from '@src/apis/users/services/users.service';
import { ApiCreateUser } from '@src/apis/users/swagger-decorators/api-create-user.swagger';
import { ApiDeleteUser } from '@src/apis/users/swagger-decorators/api-delete-user.swagger';
import { ApiFindOneUser } from '@src/apis/users/swagger-decorators/api-find-one-user.swagger';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { User } from '@src/common/decorators/user.decorator';
import { ParsePositiveIntPipe } from '@src/common/pipes/parse-positive-int.pipe';
import { SetResponse } from '@src/interceptors/response-transformer-interceptor/decorators/set-response.decorator';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreateUser('유저 생성(회원가입) API')
  @Post()
  @SetResponse(RESPONSE_KEY.User)
  create(
    @Body() createUserRequestBodyDto: CreateUserRequestBodyDto,
  ): Promise<UserDto> {
    return this.usersService.create(createUserRequestBodyDto);
  }

  @ApiFindOneUser('유저 상세 조회 API')
  @Get(':userId')
  findOne(
    @Param('userId', ParsePositiveIntPipe) userId: number,
  ): Promise<UserDto> {
    return this.usersService.findOneOrNotFound(userId);
  }

  @ApiDeleteUser('유저 삭제(회원 탈퇴) API')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  @UseGuards(JwtAccessTokenGuard)
  delete(
    @User() user: Payload,
    @Param('userId', ParsePositiveIntPipe) userId: number,
  ): Promise<number> {
    return this.usersService.delete(user.id, userId);
  }
}
