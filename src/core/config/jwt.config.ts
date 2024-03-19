import { registerAs } from '@nestjs/config';
import { JWT_CONFIG_TOKEN } from '@src/core/config/constants/config.token';

export default registerAs(JWT_CONFIG_TOKEN, () => ({
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
}));
