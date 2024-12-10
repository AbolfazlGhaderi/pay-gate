import { Prop } from '@nestjs/mongoose'
import mongoose from 'mongoose'


export class BaseSchema
{
  @Prop({ type: mongoose.Schema.Types.Date, unique: true, required: true, default: Date.now() })
  createdAt: Date
  @Prop({ type: mongoose.Schema.Types.Date, unique: true, required: true, default: Date.now() })
  updatedAt: Date
}