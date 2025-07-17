import { User } from 'src/users/entities/user.entity';
import { UserRole } from '../enums/userRole.enum';
import { UserStatus } from '../enums/userStatus.enum';
export declare class ResponseUserDto {
    id: string;
    login: string;
    role: UserRole;
    fullName: string;
    email: string;
    job: string;
    phone: string;
    status: UserStatus;
    dateCreated: Date;
    constructor(user: User);
}
