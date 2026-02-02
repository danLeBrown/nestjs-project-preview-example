import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redis: RedisService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const pong = await this.redis.ping();
      const isOk = pong === 'PONG';
      const result = this.getStatus(key, isOk, { response: pong });
      if (isOk) return result;
      throw new HealthCheckError('Redis check failed', result);
    } catch (err) {
      const result = this.getStatus(key, false, { error: (err as Error).message });
      throw new HealthCheckError('Redis check failed', result);
    }
  }
}
