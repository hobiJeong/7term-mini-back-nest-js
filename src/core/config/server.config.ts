import { registerAs } from '@nestjs/config';
import { SERVER_CONFIG_TOKEN } from '@src/core/config/constants/config.token';

export default registerAs(SERVER_CONFIG_TOKEN, () => ({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
}));
