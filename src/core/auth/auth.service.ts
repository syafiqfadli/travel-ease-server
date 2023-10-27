import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Response } from 'src/core/response/response.entity';
import { UserService } from 'src/features/user/user.service';
import { Auth, AuthDocument } from './auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signUp(body: any): Promise<any> {
    const { email, password, displayName } = body;

    if (!email || !password || !displayName) {
      return Response.errorResponse('Required data is null.');
    }

    try {
      const isEmailFound = await this.emailFound(email);

      if (isEmailFound) {
        return Response.errorResponse(
          'This email is already registered. Please use a different email or log in.',
        );
      }

      const userBody = {
        displayName: displayName,
        email: email,
      };

      await this.userService.createUser(userBody);

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      await new this.authModel({
        email: email,
        password: hashedPassword,
      }).save();

      return Response.messageResponse('Account created successfully.');
    } catch (error) {
      return Response.errorResponse(error.toString());
    }
  }

  async logIn(body: any): Promise<any> {
    const { email, password } = body;

    if (!email || !password) {
      return Response.errorResponse('Required data is null.');
    }

    try {
      const isEmailFound = await this.emailFound(email);

      if (!isEmailFound) {
        return Response.errorResponse(
          'Email not found. Please check your email or sign up',
        );
      }

      const data = await this.userService.getUser(email);

      const hashedPassword = await this.getPassword(email);
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);

      if (!isPasswordValid) {
        return Response.errorResponse('Incorrect password. Please try again.');
      }

      const token = {
        authToken: await this.jwtService.signAsync(data, {
          noTimestamp: true,
          expiresIn: '30m',
        }),
      };

      return Response.dataResponse(token);
    } catch (error) {
      return Response.errorResponse(error.toString());
    }
  }

  async resetPassword(body: any): Promise<any> {
    const { email, password } = body;

    if (!email || !password) {
      return Response.errorResponse('Required data is null.');
    }

    try {
      const isEmailFound = await this.emailFound(email);

      if (!isEmailFound) {
        return Response.errorResponse(
          'Email not found. Please check your email or sign up',
        );
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      await this.authModel.findOneAndUpdate(
        {
          email: email,
        },
        {
          $set: {
            password: hashedPassword,
          }
        },
        {
          new: true,
          runValidators: true,
        },
      )

      return Response.messageResponse('Password reset sucessfully.');
    } catch (error) {
      return Response.errorResponse(error.toString());
    }
  }

  async emailFound(email: string): Promise<boolean> {
    const isEmailFound = await this.authModel.findOne({ email: email }).exec();

    if (isEmailFound) {
      return true;
    }

    return false;
  }

  async getPassword(email: string): Promise<string> {
    const response = await this.authModel.findOne({ email: email }).exec();

    return response!.password;
  }
}
