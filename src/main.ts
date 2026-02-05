import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Bootstrap');

    app.enableCors(corsOptionsDelegate);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.setGlobalPrefix('api');
    console.log(process.env.PORT);
    await app.listen(process.env.PORT);
    logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();

const allowlist = ['http://localhost:4200', 'https://papeleria.alumbrado.net', "*"]
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    const origin = req.header('Origin');

    // if (allowlist.includes('*') || allowlist.includes(origin)) {
    //     corsOptions = { origin: true }; // Allow all origins if '*' is in the allowlist or if the origin is explicitly allowed
    // } else {
    //     corsOptions = { origin: false }; // Disable CORS for this request
    // }
    corsOptions = { origin: true };

    callback(null, corsOptions); // callback expects two parameters: error and options
};