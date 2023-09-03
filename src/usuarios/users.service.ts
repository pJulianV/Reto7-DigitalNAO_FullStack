import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async add(newUser: string): Promise<User> {
    const nuevo = this.usersRepository.create({
      nombre: newUser,
    })
    await this.usersRepository.save(nuevo)
    return nuevo
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
