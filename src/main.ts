import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.use(helmet());

    app.enableCors({
        origin: configService.get<string>('DOMAIN'),
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.setGlobalPrefix('/api/v1');

    Logger.log(
        configService.get<number>('PORT'),
        configService.get<string>('HOSTNAME'),
    );

    await app.listen(
        configService.get<number>('PORT'),
        configService.get<string>('HOST'),
    );
}
bootstrap();
