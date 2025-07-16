import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthReponseDto } from './dto/response-auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { FakerUntil } from 'src/shared/utils/fakerUtil';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enums/userRole.enum';
import { UserStatus } from 'src/users/enums/userStatus.enum';

@Injectable()
export class AuthService {
  private expiresIn: number;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expiresIn = parseInt(
      this.configService.get<string>('JWT_EXPIRATION_TIME') || '0',
    );
  }

  async login(username: string, password: string): Promise<AuthReponseDto> {
    const foundUser = await this.userService.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.login };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.expiresIn };
  }

  register(createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto,
      UserStatus.MANUALLY,
      UserRole.USER,
    );
  }

  registerAdmin(createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto,
      UserStatus.MANUALLY,
      UserRole.ADMIN,
    );
  }

  generate() {
    const user = new FakerUntil().createUser();

    return this.userService.create(
      user,
      UserStatus.AUTOMATICALLY,
      UserRole.USER,
    );
  }
}
