import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  @ApiOperation({
    summary: 'Check health status of the application and database',
  })
  @ApiResponse({ status: 200, description: 'Application is running.' })
  async check() {
    const dbStatus = (this.connection.readyState as any) === 1 ? 'UP' : 'DOWN';
    return {
      status: dbStatus === 'UP' ? 'UP' : 'DOWN',
      details: {
        database: {
          status: dbStatus,
        },
      },
    };
  }
}
