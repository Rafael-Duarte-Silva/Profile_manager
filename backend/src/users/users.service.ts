import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { hashSync } from 'bcrypt';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';
import { FindUserDto } from './dto/find-user.dto';

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
      createUserDto.username,
    );

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${createUserDto.username}' already registered`,
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

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async findAll({ page, search, sort }: FindUserDto) {
    const take: number = 8;
    const [users] = await this.userRepository.findAndCount({
      order: { [sort]: 'ASC' },
      where: {
        role: UserRole.USER,
        username: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${search}%')`),
      },
      skip: (page - 1) * take,
      take,
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
