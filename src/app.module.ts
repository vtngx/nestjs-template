import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { DatabaseModule } from './root.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/users/user.module';
import { logger } from './middlewares/logger.middleware';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
