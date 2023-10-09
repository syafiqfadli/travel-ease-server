import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/core/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('info')
  async userInfo(@Req() req: any) {
    const email = req.user.isSuccess ? req.user.data.email : 'xxxx@xxxx.com';

    return await this.userService.getUser(email);
  }
}
