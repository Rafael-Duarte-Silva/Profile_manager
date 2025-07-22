import { AuthReponseDto } from './dto/response-auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-use.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginUserDto, response: Response): Promise<AuthReponseDto>;
    register(createUserDto: CreateUserDto): Promise<{
        status: string;
    }>;
    registerAdmin(createUserDto: CreateUserDto): Promise<{
        status: string;
    }>;
    RegisterGenerate(): Promise<{
        status: string;
    }>;
}
