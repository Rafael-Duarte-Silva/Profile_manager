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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const response_user_dto_1 = require("./dto/response-user.dto");
const bcrypt_1 = require("bcrypt");
const userRole_enum_1 = require("./enums/userRole.enum");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto, status, role) {
        const userAlreadyRegistered = await this.findByUsername(createUserDto.login);
        if (userAlreadyRegistered) {
            throw new common_1.ConflictException(`User '${createUserDto.login}' already registered`);
        }
        const dbUser = {
            ...createUserDto,
            role,
            status,
            password: (0, bcrypt_1.hashSync)(createUserDto.password, 10),
        };
        await this.userRepository.save(dbUser);
        return { status: 'created' };
    }
    deleteAllById(id) {
        return this.userRepository.delete(id);
    }
    findById(id) {
        return this.userRepository.findOneBy({ id });
    }
    findByUsername(login) {
        return this.userRepository.findOneBy({ login });
    }
    async findAll({ page, search, sort }) {
        const take = 8;
        const [users] = await this.userRepository.findAndCount({
            order: { [sort]: 'ASC' },
            where: {
                role: userRole_enum_1.UserRole.USER,
                login: (0, typeorm_2.Raw)((alias) => `LOWER(${alias}) LIKE LOWER('%${search}%')`),
            },
            skip: (page - 1) * take,
            take,
        });
        if (users === null) {
            return;
        }
        return users.map((user) => this.response(user));
    }
    response(user) {
        return new response_user_dto_1.ResponseUserDto(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map