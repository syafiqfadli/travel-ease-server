import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/features/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
