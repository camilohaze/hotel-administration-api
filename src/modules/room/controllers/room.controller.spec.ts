import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomController } from './room.controller';

import { ConfigService, RoomService } from '@services';
import { RoomEntity } from '@entities';
import { RoomSubscriber } from '@subscribers';

describe('Room Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: RoomController;
  let service: RoomService;
  let config: ConfigService;
  let room: RoomEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        RoomService,
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
          entities: [RoomEntity],
          subscribers: [RoomSubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined RoomController', () => {
    controller = module.get<RoomController>(RoomController);

    expect(controller).toBeDefined();
  });

  it('should be defined RoomService', () => {
    service = module.get<RoomService>(RoomService);

    expect(service).toBeDefined();
  });

  it('/GET room by id', async () => {
    return request(app.getHttpServer()).get('/rooms/1').expect(200);
  });

  it('/GET room by hotel id', async () => {
    return request(app.getHttpServer()).get('/rooms/hotel/1').expect(200);
  });

  it('/POST room', async (done) => {
    room = {
      name: 'Administradores',
      hotelId: 1,
    };

    return request(app.getHttpServer())
      .post('/rooms')
      .send(room)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT room', async () => {
    room = {
      id: 1,
      name: 'Administrador',
      hotelId: 1,
    };

    return request(app.getHttpServer()).put('/rooms').send(room).expect(200);
  });

  it('/DELETE room', async () => {
    room = {
      id: 1,
      name: 'Administrador',
      hotelId: 1,
    };

    return request(app.getHttpServer()).delete('/rooms').send(room).expect(200);
  });
});
