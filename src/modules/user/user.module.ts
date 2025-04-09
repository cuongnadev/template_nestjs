import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from 'src/db/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
