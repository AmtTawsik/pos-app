import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  _id: string; // ✅ Explicitly add _id to the type

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false }) // ✅ Already optional, good!
  password?: string; // ✅ Mark as optional in TypeScript
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
