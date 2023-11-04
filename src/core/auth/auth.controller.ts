import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() body: any) {
    return await this.authService.signUp(body);
  }

  @Post('log-in')
  async logIn(@Body() body: any) {
    return await this.authService.logIn(body);
  }

  @Patch('reset-password')
  async resetPassword(@Body() body: any) {
    return await this.authService.resetPassword(body);
  }
}
