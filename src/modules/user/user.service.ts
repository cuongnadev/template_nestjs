import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
// import { DatabaseService } from 'src/db/database.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  getUser(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
  create(userData: Partial<User>): Promise<User | null> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }
  async delete(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.delete(id);
    return user;
  }
}
