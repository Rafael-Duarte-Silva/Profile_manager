"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUserDto = void 0;
class ResponseUserDto {
    id;
    login;
    role;
    fullName;
    email;
    job;
    phone;
    status;
    dateCreated;
    constructor(user) {
        this.id = user.id;
        this.login = user.login;
        this.role = user.role;
        this.fullName = user.fullName;
        this.email = user.email;
        this.job = user.job;
        this.phone = user.phone;
        this.status = user.status;
        this.dateCreated = user.dateCreated;
    }
}
exports.ResponseUserDto = ResponseUserDto;
//# sourceMappingURL=response-user.dto.js.map