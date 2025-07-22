"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt_1 = require("bcrypt");
const config_1 = require("@nestjs/config");
const fakerUtil_1 = require("../shared/utils/fakerUtil");
const userRole_enum_1 = require("../users/enums/userRole.enum");
const userStatus_enum_1 = require("../users/enums/userStatus.enum");
let AuthService = class AuthService {
    userService;
    jwtService;
    configService;
    expiresIn;
    isSecure;
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.expiresIn = parseInt(this.configService.get('JWT_EXPIRATION_TIME') || '0');
        this.isSecure = this.configService.get('NODE_ENV') === 'production';
    }
    async login({ username, password }, response) {
        const foundUser = await this.userService.findByUsername(username);
        if (!foundUser || !(0, bcrypt_1.compareSync)(password, foundUser.password)) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { sub: foundUser.id, username: foundUser.username };
        const token = this.jwtService.sign(payload);
        response.cookie('jwt', token, {
            httpOnly: true,
            secure: this.isSecure,
            maxAge: this.expiresIn * 1000,
        });
        return { message: 'authorized' };
    }
    register(createUserDto) {
        return this.userService.create(createUserDto, userStatus_enum_1.UserStatus.MANUALLY, userRole_enum_1.UserRole.USER);
    }
    registerAdmin(createUserDto) {
        return this.userService.create(createUserDto, userStatus_enum_1.UserStatus.MANUALLY, userRole_enum_1.UserRole.ADMIN);
    }
    generate() {
        const user = new fakerUtil_1.FakerUntil().createUser();
        return this.userService.create(user, userStatus_enum_1.UserStatus.AUTOMATICALLY, userRole_enum_1.UserRole.USER);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map