import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentTypeController } from './document-type.controller';

import { ConfigService, DocumentTypeService } from '@services';
import { DocumentTypeEntity } from '@entities';
import { DocumentTypeSubscriber } from '@subscribers';

describe('DocumentType Controller', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: DocumentTypeController;
  let service: DocumentTypeService;
  let config: ConfigService;
  let documentType: DocumentTypeEntity;

  beforeAll(async () => {
    config = new ConfigService(
      `src/modules/config/environments/${process.env.NODE_ENV.trim()}.env`,
    );
    module = await Test.createTestingModule({
      controllers: [DocumentTypeController],
      providers: [
        DocumentTypeService,
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
          entities: [DocumentTypeEntity],
          subscribers: [DocumentTypeSubscriber],
          migrations: [],
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('should be defined DocumentTypeController', () => {
    controller = module.get<DocumentTypeController>(DocumentTypeController);

    expect(controller).toBeDefined();
  });

  it('should be defined DocumentTypeService', () => {
    service = module.get<DocumentTypeService>(DocumentTypeService);

    expect(service).toBeDefined();
  });

  it('/GET document types', async () => {
    return request(app.getHttpServer()).get('/document-types').expect(200);
  });

  it('/GET document type by id', async () => {
    return request(app.getHttpServer()).get('/document-types/1').expect(200);
  });

  it('/POST document type', async (done) => {
    documentType = {
      name: 'Conquistadores',
    };

    return request(app.getHttpServer())
      .post('/document-types')
      .send(documentType)
      .expect(201)
      .expect((res) => {
        done(res);
      });
  });

  it('/PUT document type', async () => {
    documentType = {
      id: 1,
      name: 'Conquistadores II',
    };

    return request(app.getHttpServer())
      .put('/document-types')
      .send(documentType)
      .expect(200);
  });

  it('/DELETE document type', async () => {
    documentType = {
      id: 1,
      name: 'Administrador',
    };

    return request(app.getHttpServer())
      .delete('/document-types')
      .send(documentType)
      .expect(200);
  });
});
