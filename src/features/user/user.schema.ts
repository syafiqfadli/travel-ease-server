import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  displayName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
