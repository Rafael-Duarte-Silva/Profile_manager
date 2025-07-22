import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserSort } from '../enums/userSort.enum';

export class FindUserDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsString()
  search: string = '';

  @IsOptional()
  @IsEnum(UserSort, { message: 'field invalid' })
  sort: UserSort = UserSort.DATE_CREATED;
}
