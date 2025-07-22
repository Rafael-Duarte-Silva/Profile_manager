"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
const dataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT') || '0'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [user_entity_1.User],
    migrations: [__dirname + '/migrations/*.ts'],
    ssl: configService.get('NODE_ENV') === 'production'
        ? {
            rejectUnauthorized: false,
        }
        : false,
    synchronize: false,
};
exports.default = new typeorm_1.DataSource(dataSourceOptions);
//# sourceMappingURL=typeOrm.migration-config.js.map