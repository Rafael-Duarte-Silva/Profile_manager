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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("./roles.decorator");
const users_service_1 = require("../../users/users.service");
let RolesGuard = class RolesGuard {
    userService;
    reflector;
    constructor(userService, reflector) {
        this.userService = userService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get(roles_decorator_1.Roles, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userDb = await this.userService.findById(user.sub);
        if (!userDb) {
            return false;
        }
        return this.matchRoles(roles, userDb.role);
    }
    matchRoles(roles, userRole) {
        return roles.some((role) => role === userRole);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map