"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User1752699803660 = void 0;
class User1752699803660 {
    async up(queryRunner) {
        await queryRunner.query(` CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');
        CREATE TYPE user_status AS ENUM ('MANUALLY', 'AUTOMATICALLY');

        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            login TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role user_role NOT NULL,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            job TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            status user_status NOT NULL,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`);
    }
}
exports.User1752699803660 = User1752699803660;
//# sourceMappingURL=1752699803660-user.js.map