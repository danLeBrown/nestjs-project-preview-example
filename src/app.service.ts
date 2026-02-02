import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

const STATS_KEY = 'api:request_count';

@Injectable()
export class AppService {
  constructor(private readonly redis: RedisService) {}

  getHello(): { message: string; api: string } {
    return {
      message: 'Hello World!',
      api: 'nestjs-project-preview-example',
    };
  }

  previewHello(): { message: string; api: string } {
    return {
      message: 'Hello World!',
      api: 'nestjs-project-preview-example',
    };
  }

  async getStats(): Promise<{ requestCount: number; timestamp: string }> {
    const raw = await this.redis.get(STATS_KEY);
    const count = raw ? parseInt(raw, 10) + 1 : 1;
    await this.redis.set(STATS_KEY, String(count), 86400); // 24h TTL
    return {
      requestCount: count,
      timestamp: new Date().toISOString(),
    };
  }
}
