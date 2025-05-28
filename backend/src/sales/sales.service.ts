import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ProductsService } from "../products/products.service";
import { CreateSaleDto, SaleItemDto } from "./dto/create-sale.dto";
import { Sale, SaleDocument } from "./schemas/sale.schema";

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    private productsService: ProductsService
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    try {
      // Process each item in the sale
      for (const item of createSaleDto.items) {
        // Update stock for each product
        await this.productsService.updateStock(item.productId, item.quantity);
      }

      // Calculate total amount
      const totalAmount = createSaleDto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Prepare sale items with total for each item
      const saleItems = createSaleDto.items.map((item: SaleItemDto) => ({
        ...item,
        total: item.price * item.quantity,
      }));

      // Create and save the sale
      const sale = new this.saleModel({
        items: saleItems,
        totalAmount,
      });

      return sale.save();
    } catch (error) {
      throw new Error(`Failed to process sale: ${error.message}`);
    }
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }

  async findById(id: string): Promise<Sale> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Invalid sale ID format");
    }

    const sale = await this.saleModel.findById(id).exec();
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }
}
