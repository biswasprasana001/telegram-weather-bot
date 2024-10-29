// src/bot/bot.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly weatherApiKey: string;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    this.weatherApiKey = this.configService.get<string>('WEATHER_API_KEY');
  }

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/subscribe (.+)/, async (msg, match) => {
      const chatId = msg.chat.id.toString();
      const city = match[1];

      await this.userService.subscribeUser(chatId, city);
      this.bot.sendMessage(
        chatId,
        `Subscribed to daily weather updates for ${city}.`,
      );
    });
  }

  private async getWeather(city: string): Promise<string> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.weatherApiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;
    return `Weather in ${data.name}: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
  }

  @Cron('0 8 * * *')
  async sendDailyWeatherUpdates() {
    const subscribers = await this.userService.getAllSubscribers();
    for (const subscriber of subscribers) {
      const weatherMessage = await this.getWeather(subscriber.city);
      this.bot.sendMessage(subscriber.chatId, weatherMessage);
    }
  }
}
