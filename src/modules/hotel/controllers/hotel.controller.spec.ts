import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelController } from './hotel.controller';

import { ConfigService, HotelService } from '@services';
import { HotelEntity } from '@entities';
import { HotelSubscriber } from '@subscribers';

describe('Hotel Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: HotelController;
  let service: HotelService;
  let config: ConfigService;
  let hotel: HotelEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [
        HotelService,
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
          entities: [HotelEntity],
          subscribers: [HotelSubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined HotelController', () => {
    controller = module.get<HotelController>(HotelController);

    expect(controller).toBeDefined();
  });

  it('should be defined HotelService', () => {
    service = module.get<HotelService>(HotelService);

    expect(service).toBeDefined();
  });

  it('/GET hotels', async () => {
    return request(app.getHttpServer()).get('/hotels').expect(200);
  });

  it('/GET hotel by id', async () => {
    return request(app.getHttpServer()).get('/hotels/1').expect(200);
  });

  it('/POST hotel', async (done) => {
    hotel = {
      name: 'Conquistadores',
    };

    return request(app.getHttpServer())
      .post('/hotels')
      .send(hotel)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT hotel', async () => {
    hotel = {
      id: 1,
      name: 'Conquistadores II',
    };

    return request(app.getHttpServer()).put('/hotels').send(hotel).expect(200);
  });

  it('/DELETE hotel', async () => {
    hotel = {
      id: 1,
      name: 'Administrador',
    };

    return request(app.getHttpServer())
      .delete('/hotels')
      .send(hotel)
      .expect(200);
  });
});
