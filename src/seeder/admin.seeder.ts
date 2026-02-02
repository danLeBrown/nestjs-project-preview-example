import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../database/entities/admin.entity';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AdminSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    await this.run();
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async run(): Promise<void> {
    const email = this.config.get<string>('admin.email', 'admin@example.com');
    const password = this.config.get<string>('admin.password', 'changeme');

    const existing = await this.adminRepo.findOne({ where: { email } });
    if (existing) return;

    const admin = this.adminRepo.create({
      email,
      passwordHash: this.hashPassword(password),
      isActive: true,
    });
    await this.adminRepo.save(admin);
    // eslint-disable-next-line no-console
    console.log(`[Seeder] Admin created: ${email}`);
  }
}
