"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.enableCors(corsOptionsDelegate);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    console.log(process.env.PORT);
    await app.listen(process.env.PORT);
    logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
const allowlist = ['http://localhost:4200', 'https://papeleria.servicios.space', 'http://papeleria.servicios.space', 'https://papeleria.suacdap.site'];
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
//# sourceMappingURL=main.js.map