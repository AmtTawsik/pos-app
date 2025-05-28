import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { Sale } from "./schemas/sale.schema";

@Controller("sales") // Added base path
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  async findAll() {
    return this.salesService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Sale> {
    const sale = await this.salesService.findById(id);
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }
}
