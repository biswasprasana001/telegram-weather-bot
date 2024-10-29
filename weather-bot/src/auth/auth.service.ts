// weather-bot\src\auth\auth.service.ts
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../admin/schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateOrCreateAdmin(profile: {
    googleId: string;
    email: string;
    name: string;
  }) {
    let admin = await this.adminModel.findOne({ googleId: profile.googleId });
    if (!admin) {
      admin = new this.adminModel(profile);
      await admin.save();
    }
    return this.createJwtPayload(admin);
  }

  createJwtPayload(admin: Admin) {
    const payload = { googleId: admin.googleId, email: admin.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
