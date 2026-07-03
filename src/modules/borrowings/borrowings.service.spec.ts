import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BorrowingsService } from './borrowings.service';
import { Borrowing } from './schemas/borrowing.schema';
import { BooksService } from '../books/books.service';

describe('BorrowingsService', () => {
  let service: BorrowingsService;

  beforeEach(async () => {
    const mockBorrowingModel = {};
    const mockBooksService = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowingsService,
        {
          provide: getModelToken(Borrowing.name),
          useValue: mockBorrowingModel,
        },
        { provide: BooksService, useValue: mockBooksService },
      ],
    }).compile();

    service = module.get<BorrowingsService>(BorrowingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
