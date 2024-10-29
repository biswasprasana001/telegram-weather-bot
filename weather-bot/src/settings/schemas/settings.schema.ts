// weather-bot\src\settings\schemas\settings.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop({ required: true })
  weatherApiKey: string;

  @Prop({ required: true })
  telegramBotToken: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
