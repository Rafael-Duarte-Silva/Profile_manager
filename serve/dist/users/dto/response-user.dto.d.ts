import { User } from 'src/users/entities/user.entity';
import { UserStatus } from '../enums/userStatus.enum';
export declare class ResponseUserDto {
    id: string;
    username: string;
    fullName: string;
    email: string;
    job: string;
    phone: string;
    status: UserStatus;
    dateCreated: Date;
    constructor(user: User);
}
