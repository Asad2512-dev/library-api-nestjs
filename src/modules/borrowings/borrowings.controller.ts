import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BorrowingsService } from './borrowings.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/constants';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Borrowings')
@Controller('borrowings')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BorrowingsController {
  constructor(private readonly borrowingsService: BorrowingsService) {}

  @Post('borrow')
  @Roles(UserRole.MEMBER, UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Borrow a book (Member/Librarian/Admin)' })
  @ApiResponse({ status: 201, description: 'Book borrowed successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Book is unavailable or invalid due date.',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate active borrowing for same book.',
  })
  async borrowBook(
    @CurrentUser('_id') userId: string,
    @Body() borrowBookDto: BorrowBookDto,
  ) {
    return this.borrowingsService.borrowBook(userId, borrowBookDto);
  }

  @Post('return/:id')
  @Roles(UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Return a borrowed book (Librarian/Admin)' })
  @ApiResponse({ status: 200, description: 'Book returned successfully.' })
  @ApiResponse({ status: 404, description: 'Borrowing record not found.' })
  async returnBook(@Param('id') id: string) {
    return this.borrowingsService.returnBook(id);
  }

  @Get()
  @Roles(UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all borrowings (Librarian/Admin)' })
  @ApiResponse({ status: 200, description: 'Return list of all borrowings.' })
  async findAll() {
    return this.borrowingsService.findAll();
  }

  @Get('my')
  @Roles(UserRole.MEMBER, UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get current user borrowings' })
  @ApiResponse({ status: 200, description: 'Return current user borrowings.' })
  async findMyBorrowings(@CurrentUser('_id') userId: string) {
    return this.borrowingsService.findByUserId(userId);
  }

  @Get('overdue')
  @Roles(UserRole.LIBRARIAN, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get overdue borrowings (Librarian/Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Return list of overdue borrowings.',
  })
  async findOverdue() {
    return this.borrowingsService.findOverdue();
  }
}
