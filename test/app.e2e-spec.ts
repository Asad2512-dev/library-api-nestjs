import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { HealthController } from '../src/modules/health/health.controller';
import { getConnectionToken } from '@nestjs/mongoose';

describe('App (e2e)', () => {
  let app: INestApplication;
  let mockConnection: any;

  beforeEach(async () => {
    mockConnection = {
      readyState: 1,
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          status: 'UP',
          details: {
            database: {
              status: 'UP',
            },
          },
        });
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
