import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "../products/products.module";
import { SalesController } from "./sales.controller";
import { SalesService } from "./sales.service";
import { Sale, SaleSchema } from "./schemas/sale.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ProductsModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService], // Added exports if other modules need to use SalesService
})
export class SalesModule {}
