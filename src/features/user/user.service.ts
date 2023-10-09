import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Response } from 'src/core/response/response.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(body: any): Promise<void> {
    const { displayName, email } = body;

    await new this.userModel({
      displayName: displayName,
      email: email,
    }).save();
  }

  async getUser(email: string): Promise<Response> {
    const user = await this.userModel
      .findOne({ email: email }, { password: 0 })
      .exec();

    return Response.dataResponse(user);
  }
}
