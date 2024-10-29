// weather-bot\src\admin\user-management.controller.ts
// src/admin/user-management.controller.ts
import { Controller, Get, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from '../bot/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/users')
export class UserManagementController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listUsers() {
    return this.userService.getAllSubscribers();
  }

  @Patch(':id/block')
  async blockUser(@Param('id') userId: string) {
    return this.userService.updateUser(userId, { isBlocked: true });
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
