import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/userRole.enum';
import { UserStatus } from '../enums/userStatus.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ name: 'full_name', type: 'text' })
  fullName: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  job: string;

  @Column({ type: 'text', nullable: false })
  phone: string;

  @Column({ type: 'enum', nullable: false, enum: UserStatus })
  status: UserStatus;

  @CreateDateColumn({ name: 'date_created' })
  dateCreated: Date;
}
