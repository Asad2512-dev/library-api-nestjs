import { UserRole } from '../../../common/constants';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}
