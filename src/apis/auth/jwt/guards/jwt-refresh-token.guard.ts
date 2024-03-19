import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
