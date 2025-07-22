import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserRole } from './enums/userRole.enum';
import { UserStatus } from './enums/userStatus.enum';
import { FindUserDto } from './dto/find-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto, status: UserStatus, role: UserRole): Promise<{
        status: string;
    }>;
    deleteAllById(id: string[]): Promise<import("typeorm").DeleteResult>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findAll({ page, search, sort }: FindUserDto): Promise<ResponseUserDto[] | undefined>;
    private response;
}
