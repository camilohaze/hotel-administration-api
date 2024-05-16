import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';

import { ConfigService, AuthService } from '@services';
import { AuthEntity } from '@entities';
import { AuthSubscriber } from '@subscribers';

describe('Auth Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: AuthController;
  let service: AuthService;
  let config: ConfigService;
  let auth: AuthEntity;

  beforeAll(async () => {
    config = new ConfigService('src/modules/config/environments/staging.env');
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: new ConfigService(
            `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
          ),
        },
      ],
      imports: [
        TypeOrmModule.forRoot({
          type: config.get('DRIVER'),
          host: `${config.get('HOST')}`,
          port: config.get('PORT'),
          database: `${config.get('DATABASE')}`,
          entities: [AuthEntity],
          subscribers: [AuthSubscriber],
          migrations: [],
          synchronize: false,
          logging: 'all',
          logger: 'file',
          useNewUrlParser: true,
          keepConnectionAlive: true,
          ignoreUndefined: false,
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined AuthController', () => {
    controller = module.get<AuthController>(AuthController);

    expect(controller).toBeDefined();
  });

  it('should be defined AuthService', () => {
    service = module.get<AuthService>(AuthService);

    expect(service).toBeDefined();
  });

  it('/POST auth', async (done) => {
    auth = {
      email: 'cristian.naranjo@outlook.es',
      password: 'Asdf1234.',
    };

    return request(app.getHttpServer())
      .post('/auth')
      .send(auth)
      .expect(201)
      .expect((res) => {
        if (res.body.token === undefined) {
          return done(res);
        }

        done();
      });
  });
});
