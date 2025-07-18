import { User } from 'src/users/entities/user.entity';
import { UserStatus } from '../enums/userStatus.enum';

export class ResponseUserDto {
  id: string;
  username: string;
  fullName: string;
  email: string;
  job: string;
  phone: string;
  status: UserStatus;
  dateCreated: Date;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.fullName = user.fullName;
    this.email = user.email;
    this.job = user.job;
    this.phone = user.phone;
    this.status = user.status;
    this.dateCreated = user.dateCreated;
  }
}
