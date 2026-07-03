import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let connection: { readyState: number };

  beforeEach(async () => {
    const mockConnection = {
      readyState: 1, // Connected
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: getConnectionToken(), useValue: mockConnection }],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    connection = module.get<{ readyState: number }>(getConnectionToken());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should return UP status if database readyState is 1', async () => {
      const result = await controller.check();
      expect(result).toEqual({
        status: 'UP',
        details: {
          database: {
            status: 'UP',
          },
        },
      });
    });

    it('should return DOWN status if database readyState is not 1', async () => {
      connection.readyState = 0; // Disconnected
      const result = await controller.check();
      expect(result).toEqual({
        status: 'DOWN',
        details: {
          database: {
            status: 'DOWN',
          },
        },
      });
    });
  });
});
