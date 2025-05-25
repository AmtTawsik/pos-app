import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, default: 0, min: 0 })
  stockQty: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);