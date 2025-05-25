import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return updatedProduct;
  }

  async search(query: string): Promise<Product[]> {
    const regex = new RegExp(query, 'i');
    return this.productModel
      .find({
        $or: [{ name: regex }, { code: regex }],
      })
      .exec();
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    
    if (product.stockQty < quantity) {
      throw new Error(`Not enough stock for product: ${product.name}`);
    }
    
    product.stockQty -= quantity;
    return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }
}