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
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  index(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('search')
  search(@Query() query: { keyword: string }) {
    return {
      keyword: query.keyword,
    };
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUser(+id);
  }

  @Post()
  create(@Body() userData: Partial<User>): Promise<User | null> {
    return this.userService.create(userData);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
  ): Promise<User | null> {
    return this.userService.update(+id, userData);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<User | null> {
    return this.userService.delete(+id);
  }
}
