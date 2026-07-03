"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FineStatus = exports.BorrowingStatus = exports.BookStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["LIBRARIAN"] = "LIBRARIAN";
    UserRole["MEMBER"] = "MEMBER";
})(UserRole || (exports.UserRole = UserRole = {}));
var BookStatus;
(function (BookStatus) {
    BookStatus["AVAILABLE"] = "AVAILABLE";
    BookStatus["UNAVAILABLE"] = "UNAVAILABLE";
    BookStatus["ARCHIVED"] = "ARCHIVED";
})(BookStatus || (exports.BookStatus = BookStatus = {}));
var BorrowingStatus;
(function (BorrowingStatus) {
    BorrowingStatus["BORROWED"] = "BORROWED";
    BorrowingStatus["RETURNED"] = "RETURNED";
    BorrowingStatus["OVERDUE"] = "OVERDUE";
})(BorrowingStatus || (exports.BorrowingStatus = BorrowingStatus = {}));
var FineStatus;
(function (FineStatus) {
    FineStatus["UNPAID"] = "UNPAID";
    FineStatus["PAID"] = "PAID";
    FineStatus["WAIVED"] = "WAIVED";
})(FineStatus || (exports.FineStatus = FineStatus = {}));
//# sourceMappingURL=index.js.map