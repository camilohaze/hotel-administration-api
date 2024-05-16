import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingController } from './booking.controller';

import { ConfigService, BookingService } from '@services';
import { BookingEntity } from '@entities';
import { BookingSubscriber } from '@subscribers';

describe('Booking Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: BookingController;
  let service: BookingService;
  let config: ConfigService;
  let booking: BookingEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        BookingService,
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
            insecureRoom: config.get('EXTRA_INSECURE_AUTH'),
          },
          entities: [BookingEntity],
          subscribers: [BookingSubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined BookingController', () => {
    controller = module.get<BookingController>(BookingController);

    expect(controller).toBeDefined();
  });

  it('should be defined BookingService', () => {
    service = module.get<BookingService>(BookingService);

    expect(service).toBeDefined();
  });

  it('/GET bookings', async () => {
    return request(app.getHttpServer()).get('/bookings').expect(200);
  });

  it('/GET booking by id', async () => {
    return request(app.getHttpServer()).get('/bookings/1').expect(200);
  });

  it('/POST booking', async (done) => {
    booking = {
      name: 'Conquistadores II',
      hotelId: 1,
      roomId: 1,
    };

    return request(app.getHttpServer())
      .post('/bookings')
      .send(booking)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT booking', async () => {
    booking = {
      id: 1,
      name: 'Conquistadores II',
      hotelId: 1,
      roomId: 1,
    };

    return request(app.getHttpServer())
      .put('/bookings')
      .send(booking)
      .expect(200);
  });

  it('/DELETE booking', async () => {
    booking = {
      id: 1,
      name: 'Conquistadores II',
      hotelId: 1,
      roomId: 1,
    };

    return request(app.getHttpServer())
      .delete('/bookings')
      .send(booking)
      .expect(200);
  });
});
