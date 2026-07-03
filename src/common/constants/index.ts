export enum UserRole {
  ADMIN = 'ADMIN',
  LIBRARIAN = 'LIBRARIAN',
  MEMBER = 'MEMBER',
}

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  ARCHIVED = 'ARCHIVED',
}

export enum BorrowingStatus {
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED',
  OVERDUE = 'OVERDUE',
}

export enum FineStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  WAIVED = 'WAIVED',
}
