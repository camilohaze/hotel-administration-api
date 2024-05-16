import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuestController } from './guest.controller';

import { ConfigService, GuestService } from '@services';
import { GuestEntity } from '@entities';
import { GuestSubscriber } from '@subscribers';

describe('Guest Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: GuestController;
  let service: GuestService;
  let config: ConfigService;
  let guest: GuestEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [GuestController],
      providers: [
        GuestService,
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
          entities: [GuestEntity],
          subscribers: [GuestSubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined GuestController', () => {
    controller = module.get<GuestController>(GuestController);

    expect(controller).toBeDefined();
  });

  it('should be defined GuestService', () => {
    service = module.get<GuestService>(GuestService);

    expect(service).toBeDefined();
  });

  it('/GET guests', async () => {
    return request(app.getHttpServer()).get('/guests').expect(200);
  });

  it('/GET guest by id', async () => {
    return request(app.getHttpServer()).get('/guests/1').expect(200);
  });

  it('/POST guest', async (done) => {
    guest = {
      firstName: 'Conquistadores',
    };

    return request(app.getHttpServer())
      .post('/guests')
      .send(guest)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT guest', async () => {
    guest = {
      id: 1,
      firstName: 'Conquistadores II',
    };

    return request(app.getHttpServer()).put('/guests').send(guest).expect(200);
  });

  it('/DELETE guest', async () => {
    guest = {
      id: 1,
      firstName: 'Administrador',
    };

    return request(app.getHttpServer())
      .delete('/guests')
      .send(guest)
      .expect(200);
  });
});
