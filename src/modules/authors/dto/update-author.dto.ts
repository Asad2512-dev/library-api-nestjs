import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @ApiPropertyOptional({ example: 'George Orwell' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Bio update...' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'Image URL...' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 'British' })
  @IsOptional()
  @IsString()
  nationality?: string;
}
