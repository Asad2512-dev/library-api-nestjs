import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../../common/constants';
describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const mockUsersService = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and return a token', async () => {
      const registerDto = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        role: UserRole.MEMBER,
      };

      const mockUser = {
        _id: 'userid123',
        name: 'John',
        email: 'john@example.com',
        role: UserRole.MEMBER,
      };

      usersService.create.mockResolvedValue(mockUser as any);
      jwtService.sign.mockReturnValue('jwt-token-123');

      const result = await service.register(registerDto);

      expect(usersService.create).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        role: UserRole.MEMBER,
      });
      expect(result).toHaveProperty('accessToken', 'jwt-token-123');
      expect(result.user).toEqual({
        id: 'userid123',
        name: 'John',
        email: 'john@example.com',
        role: UserRole.MEMBER,
      });
    });
  });
});
