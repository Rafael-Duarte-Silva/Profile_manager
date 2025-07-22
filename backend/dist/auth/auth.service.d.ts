import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthReponseDto } from './dto/response-auth.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-use.dto';
import { Response } from 'express';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    private expiresIn;
    private isSecure;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService);
    login({ username, password }: LoginUserDto, response: Response): Promise<AuthReponseDto>;
    register(createUserDto: CreateUserDto): Promise<{
        status: string;
    }>;
    registerAdmin(createUserDto: CreateUserDto): Promise<{
        status: string;
    }>;
    generate(): Promise<{
        status: string;
    }>;
}
