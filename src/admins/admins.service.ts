import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../database/entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async findAll(): Promise<Pick<Admin, 'id' | 'email' | 'isActive' | 'createdAt'>[]> {
    return this.adminRepo.find({
      select: ['id', 'email', 'isActive', 'createdAt'],
      order: { createdAt: 'ASC' },
    });
  }

  async count(): Promise<number> {
    return this.adminRepo.count();
  }
}
