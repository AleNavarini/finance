import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Find a user by ID or email' })
  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
    description: 'User ID (optional)',
  })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
    description: 'User email (optional)',
  })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  find(@Query('id') id?: string, @Query('email') email?: string) {
    if (id) {
      return this.userService.findOne(+id);
    }
    if (email) {
      return this.userService.findOneByEmail(email);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
