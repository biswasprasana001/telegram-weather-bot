// weather-bot\src\bot\user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async subscribeUser(chatId: string, city: string): Promise<User> {
    const user = new this.userModel({ chatId, city });
    return user.save();
  }

  async findUserByChatId(chatId: string): Promise<User | null> {
    return this.userModel.findOne({ chatId }).exec();
  }

  async getAllSubscribers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async deleteUser(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  }
}
