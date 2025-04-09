import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  index() {
    return this.userService.getUsers();
  }

  @Get('search')
  search(@Query() query: { keyword: string }) {
    return {
      keyword: query.keyword,
    };
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return 'User ' + id;
  }

  @Post()
  create(@Body() dataUser: { name: string }) {
    return dataUser;
  }

  @Delete()
  delete() {
    return 'Delete';
  }
}
