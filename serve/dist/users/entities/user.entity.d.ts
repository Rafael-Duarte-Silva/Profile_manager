import { UserRole } from '../enums/userRole.enum';
import { UserStatus } from '../enums/userStatus.enum';
export declare class User {
    id: string;
    login: string;
    password: string;
    role: UserRole;
    fullName: string;
    email: string;
    job: string;
    phone: string;
    status: UserStatus;
    dateCreated: Date;
}
