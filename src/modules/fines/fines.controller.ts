import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FinesService } from './fines.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/constants';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Fines')
@Controller('fines')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Post('generate')
  @Roles(UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({
    summary:
      'Scan overdue borrowings and generate/update outstanding fines (Librarian/Admin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Fines successfully scanned and generated.',
  })
  async generateFines() {
    return this.finesService.generateFines();
  }

  @Get()
  @Roles(UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all fines (Librarian/Admin)' })
  @ApiResponse({ status: 200, description: 'Return list of all fines.' })
  async findAll() {
    return this.finesService.findAll();
  }

  @Get('my')
  @Roles(UserRole.MEMBER, UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get current user fines' })
  @ApiResponse({ status: 200, description: 'Return list of user fines.' })
  async findMyFines(@CurrentUser('_id') userId: string) {
    return this.finesService.findByUserId(userId);
  }

  @Post(':id/pay')
  @Roles(UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Mark a fine as paid (Librarian/Admin)' })
  @ApiResponse({ status: 200, description: 'Fine paid successfully.' })
  @ApiResponse({ status: 400, description: 'Fine already processed.' })
  @ApiResponse({ status: 404, description: 'Fine not found.' })
  async payFine(@Param('id') id: string) {
    return this.finesService.markAsPaid(id);
  }

  @Post(':id/waive')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Waive a fine (Admin only)' })
  @ApiResponse({ status: 200, description: 'Fine waived successfully.' })
  @ApiResponse({ status: 400, description: 'Fine already processed.' })
  @ApiResponse({ status: 404, description: 'Fine not found.' })
  async waiveFine(@Param('id') id: string) {
    return this.finesService.waiveFine(id);
  }
}
