import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityController } from './city.controller';

import { ConfigService, CityService } from '@services';
import { CityEntity } from '@entities';
import { CitySubscriber } from '@subscribers';

describe('City Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: CityController;
  let service: CityService;
  let config: ConfigService;
  let city: CityEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        CityService,
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
          entities: [CityEntity],
          subscribers: [CitySubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined CityController', () => {
    controller = module.get<CityController>(CityController);

    expect(controller).toBeDefined();
  });

  it('should be defined CityService', () => {
    service = module.get<CityService>(CityService);

    expect(service).toBeDefined();
  });

  it('/GET cities', async () => {
    return request(app.getHttpServer()).get('/cities').expect(200);
  });

  it('/GET city by id', async () => {
    return request(app.getHttpServer()).get('/cities/1').expect(200);
  });

  it('/POST city', async (done) => {
    city = {
      name: 'Conquistadores',
    };

    return request(app.getHttpServer())
      .post('/cities')
      .send(city)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT city', async () => {
    city = {
      id: 1,
      name: 'Conquistadores II',
    };

    return request(app.getHttpServer()).put('/cities').send(city).expect(200);
  });

  it('/DELETE city', async () => {
    city = {
      id: 1,
      name: 'Administrador',
    };

    return request(app.getHttpServer())
      .delete('/cities')
      .send(city)
      .expect(200);
  });
});
