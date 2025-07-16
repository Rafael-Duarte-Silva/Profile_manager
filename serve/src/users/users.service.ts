import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { hashSync } from 'bcrypt';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    status: UserStatus,
    role: UserRole,
  ) {
    const userAlreadyRegistered = await this.findByUsername(
      createUserDto.login,
    );

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${createUserDto.login}' already registered`,
      );
    }

    const dbUser = {
      ...createUserDto,
      role,
      status,
      password: hashSync(createUserDto.password, 10),
    };

    await this.userRepository.save(dbUser);
    return { status: 'created' };
  }

  deleteAllById(id: string[]) {
    return this.userRepository.delete(id);
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(login: string) {
    return this.userRepository.findOneBy({ login });
  }

  async findAll(page: number, search: string) {
    const [users] = await this.userRepository.findAndCount({
      order: { dateCreated: 'ASC' },
      where: {
        role: UserRole.USER,
        login: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${search}%')`),
      },
      skip: page - 1,
      take: 8,
    });
    if (users === null) {
      return;
    }

    return users.map((user) => this.response(user));
  }

  private response(user: User) {
    return new ResponseUserDto(user);
  }
}
