import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from '../database/entities/admin.entity';
import { AdminSeeder } from './admin.seeder';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Admin]),
  ],
  providers: [AdminSeeder],
})
export class SeederModule {}
