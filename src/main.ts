process.env.TZ = 'America/Bogota';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { nestCsrf, CsrfFilter } from 'ncsrf/dist';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as compression from 'compression';

import { HttpExceptionFilter } from '@filters';
import { logger } from '@middleware';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const options = new DocumentBuilder()
    .setTitle('Hotel Administration')
    .setDescription('The Hotel Administration API.')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const corsSettings = {
    origin: [
      undefined,
      'http://localhost:4200',
      'https://localhost:4200',
      'http://localhost',
      'https://localhost',
      'http://inplace.site',
      'https://inplace.site',
      'http://inplace.uno',
      'https://inplace.uno',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  SwaggerModule.setup('help', app, document);

  app.use(logger);
  app.enableCors(corsSettings);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new CsrfFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );
  app.use(cookieParser());
  app.use(nestCsrf());
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
