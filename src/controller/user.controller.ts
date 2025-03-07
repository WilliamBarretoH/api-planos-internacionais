import { Controller, Post, Get, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { UserService } from 'src/service/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto.email, dto.password, dto.name);
  }
}
