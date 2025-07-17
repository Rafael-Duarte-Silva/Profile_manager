import { AuthReponseDto } from './dto/response-auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(username: string, password: string): Promise<AuthReponseDto>;
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
