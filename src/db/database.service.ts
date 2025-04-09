import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  findAll() {
    return ['user_1', 'user_2', 'user_3'];
  }
}
