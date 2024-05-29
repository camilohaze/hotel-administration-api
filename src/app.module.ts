import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { JwtStrategy, JwtRefreshStrategy } from '@strategies';
import { ConfigService } from '@services';
import {
  ConfigModule,
  AuthModule,
  CityModule,
  DocumentTypeModule,
  GenderModule,
  HotelModule,
  RoomModule,
  RoomTypeModule,
  BookingModule,
  GuestModule,
} from '@modules';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const config: ConfigService = new ConfigService(
  __dirname + `/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
);

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: config.get('THROTTLER_TTL'),
        limit: config.get('THROTTLER_LIMIT'),
      },
    ]),
    MailerModule.forRoot({
      transport: {
        service: config.get('SMTP_SERVICE'),
        host: config.get('SMTP_HOST'),
        port: config.get('SMTP_PORT'),
        secure: config.get('SMTP_SECURE'),
        auth: {
          user: config.get('SMTP_AUTH_USER'),
          pass: config.get('SMTP_AUTH_PASS'),
        },
      },
      defaults: {
        from: config.get('SMTP_DEFAULTS_FROM'),
      },
      template: {
        dir: __dirname + config.get('TEMPLATE_DIR'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: config.get('TEMPLATE_OPTIONS_STRICT'),
        },
      },
    }),
    TypeOrmModule.forRoot({
      schema: config.get('DATABASE'),
      type: config.get('DRIVER'),
      host: config.get('HOST'),
      port: config.get('PORT'),
      username: config.get('USERNAME'),
      password: config.get('PASSWORD'),
      database: config.get('DATABASE'),
      synchronize: config.get('SYNCHRONIZE'),
      logging: config.get('LOGGING'),
      logger: config.get('LOGGER'),
      extra: {
        insecureAuth: config.get('EXTRA_INSECURE_AUTH'),
      },
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/subscribers/*.subscriber{.ts,.js}'],
      migrationsTableName: 'migrations_accounts',
      migrations: [__dirname + '/migrations/*.migration{.ts,.js}'],
    }),
    ConfigModule,
    AuthModule,
    CityModule,
    DocumentTypeModule,
    GenderModule,
    HotelModule,
    RoomModule,
    RoomTypeModule,
    BookingModule,
    GuestModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtRefreshStrategy],
})
export class AppModule {}
