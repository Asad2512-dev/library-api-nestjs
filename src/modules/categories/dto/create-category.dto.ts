import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Science Fiction' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example:
      'Books related to scientific discoveries, future tech, space travel, etc.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
