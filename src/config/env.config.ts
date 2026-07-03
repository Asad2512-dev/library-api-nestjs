import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  PORT: number = 3000;

  @IsString()
  MONGODB_URI: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION: string = '1d';

  @IsNumber()
  FINE_RATE_PER_DAY: number = 1.5;

  @IsNumber()
  THROTTLER_TTL: number = 60000;

  @IsNumber()
  THROTTLER_LIMIT: number = 100;
}

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    {
      ...config,
      PORT: config.PORT ? parseInt(config.PORT, 10) : undefined,
      FINE_RATE_PER_DAY: config.FINE_RATE_PER_DAY
        ? parseFloat(config.FINE_RATE_PER_DAY)
        : undefined,
      THROTTLER_TTL: config.THROTTLER_TTL
        ? parseInt(config.THROTTLER_TTL, 10)
        : undefined,
      THROTTLER_LIMIT: config.THROTTLER_LIMIT
        ? parseInt(config.THROTTLER_LIMIT, 10)
        : undefined,
    },
    { enableImplicitConversion: true },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
