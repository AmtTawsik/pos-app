import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema()
export class SaleItem {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true })
  total: number;
}

export const SaleItemSchema = SchemaFactory.createForClass(SaleItem);

@Schema({ timestamps: true })
export class Sale {
  @Prop({ required: true, type: [SaleItemSchema] })
  items: SaleItem[];

  @Prop({ required: true })
  totalAmount: number;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);