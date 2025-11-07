import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: FindUserDto): Promise<import("./dto/response-user.dto").ResponseUserDto[] | undefined>;
    update(user: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    delete(id: string[]): Promise<import("typeorm").DeleteResult>;
}
