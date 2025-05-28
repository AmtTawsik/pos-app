import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { Admin, AdminDocument } from "./schemas/admin.schema";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService
  ) {}

  async validateAdmin(
    email: string,
    password: string
  ): Promise<AdminDocument | null> {
    const admin = await this.adminModel.findOne({ email }).exec();
    if (
      admin &&
      admin.password &&
      (await bcrypt.compare(password, admin.password))
    ) {
      return admin; // 🔥 Return the full Mongoose document
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateAdmin(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email: admin.email, sub: admin._id.toString() }; // 🔥 ._id.toString() for clarity
    const { password, ...adminData } = admin.toObject(); // 🔥 Remove password from response

    return {
      access_token: this.jwtService.sign(payload),
      admin: adminData, // 🔥 Return the admin data without password
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Partial<Admin>> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const createdAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });
    const admin = await createdAdmin.save();
    const { password, ...result } = admin.toObject(); // 🔥 Remove password
    return result;
  }

  async getAdminById(id: string): Promise<Partial<Admin>> {
    const admin = await this.adminModel.findById(id).select("-password").lean();
    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }
    return admin; // 🔥 Already has no password because of select
  }
}
