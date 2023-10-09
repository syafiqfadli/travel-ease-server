import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PlaceModule } from './features/place/place.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
    UserModule,
    AuthModule,
    PlaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
