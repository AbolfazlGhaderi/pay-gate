
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Document } from 'mongoose'
import { BaseSchema } from '../common/abstracts/base.schema'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User extends BaseSchema
{
  @Prop({ required: true })
  name: string

  @Prop({ unique: true, required: true })
  mobile: string

  @Prop({ unique: true, required: true })
  email: string
}

export const UserSchema = SchemaFactory.createForClass(User)