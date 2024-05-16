import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomTypeController } from './room-type.controller';

import { ConfigService, RoomTypeService } from '@services';
import { RoomTypeEntity } from '@entities';
import { RoomTypeSubscriber } from '@subscribers';

describe('RoomType Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: RoomTypeController;
  let service: RoomTypeService;
  let config: ConfigService;
  let roomType: RoomTypeEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [RoomTypeController],
      providers: [
        RoomTypeService,
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
          entities: [RoomTypeEntity],
          subscribers: [RoomTypeSubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined RoomTypeController', () => {
    controller = module.get<RoomTypeController>(RoomTypeController);

    expect(controller).toBeDefined();
  });

  it('should be defined RoomTypeService', () => {
    service = module.get<RoomTypeService>(RoomTypeService);

    expect(service).toBeDefined();
  });

  it('/GET room types', async () => {
    return request(app.getHttpServer()).get('/room-types').expect(200);
  });

  it('/GET room type by id', async () => {
    return request(app.getHttpServer()).get('/room-types/1').expect(200);
  });

  it('/POST room type', async (done) => {
    roomType = {
      type: 'Conquistadores',
    };

    return request(app.getHttpServer())
      .post('/room-types')
      .send(roomType)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT room type', async () => {
    roomType = {
      id: 1,
      type: 'Conquistadores II',
    };

    return request(app.getHttpServer())
      .put('/room-types')
      .send(roomType)
      .expect(200);
  });

  it('/DELETE room type', async () => {
    roomType = {
      id: 1,
      type: 'Administrador',
    };

    return request(app.getHttpServer())
      .delete('/room-types')
      .send(roomType)
      .expect(200);
  });
});
