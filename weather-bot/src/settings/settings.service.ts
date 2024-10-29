// weather-bot\src\settings\settings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
  ) {}

  async getSettings(): Promise<Settings> {
    return this.settingsModel.findOne().exec();
  }

  async updateSettings(updateData: Partial<Settings>): Promise<Settings> {
    return this.settingsModel.findOneAndUpdate({}, updateData, { new: true });
  }
}
