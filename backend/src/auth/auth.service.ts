import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin = await this.adminModel.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { password, ...result } = admin.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateAdmin(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: admin.email, sub: admin._id };
    return {
      access_token: this.jwtService.sign(payload),
      admin,
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const createdAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });
    const admin = await createdAdmin.save();
    const { password, ...result } = admin.toObject();
    return result;
  }

  async getAdminById(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).select('-password');
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    return admin;
  }
}