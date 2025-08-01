"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [process.env.FRONTEND_URL],
        methods: 'GET,PUT,POST,DELETE, OPTIONS',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map