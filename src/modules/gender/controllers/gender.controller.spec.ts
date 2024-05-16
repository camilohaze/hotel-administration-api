import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenderController } from './gender.controller';

import { ConfigService, GenderService } from '@services';
import { GenderEntity } from '@entities';
import { GenderSubscriber } from '@subscribers';

describe('Gender Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: GenderController;
  let service: GenderService;
  let config: ConfigService;
  let gender: GenderEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [GenderController],
      providers: [
        GenderService,
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
          synchronize: config.get('SYNCHRONIZE'),
          logging: config.get('LOGGING'),
          logger: config.get('LOGGER'),
          extra: {
            insecureAuth: config.get('EXTRA_INSECURE_AUTH'),
          },
          entities: [GenderEntity],
          subscribers: [GenderSubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined GenderController', () => {
    controller = module.get<GenderController>(GenderController);

    expect(controller).toBeDefined();
  });

  it('should be defined GenderService', () => {
    service = module.get<GenderService>(GenderService);

    expect(service).toBeDefined();
  });

  it('/GET genders', async () => {
    return request(app.getHttpServer()).get('/genders').expect(200);
  });

  it('/GET gender by id', async () => {
    return request(app.getHttpServer()).get('/genders/1').expect(200);
  });

  it('/POST gender', async (done) => {
    gender = {
      name: 'Conquistadores',
    };

    return request(app.getHttpServer())
      .post('/genders')
      .send(gender)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT gender', async () => {
    gender = {
      id: 1,
      name: 'Conquistadores II',
    };

    return request(app.getHttpServer())
      .put('/genders')
      .send(gender)
      .expect(200);
  });

  it('/DELETE gender', async () => {
    gender = {
      id: 1,
      name: 'Administrador',
    };

    return request(app.getHttpServer())
      .delete('/genders')
      .send(gender)
      .expect(200);
  });
});
