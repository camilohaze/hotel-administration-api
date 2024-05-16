import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentTypeService } from '@services';
import { DocumentTypeEntity } from '@entities';
import { ConfigModule } from '@modules';

import { DocumentTypeController } from './controllers/document-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTypeEntity]), ConfigModule],
  providers: [DocumentTypeService],
  controllers: [DocumentTypeController],
})
export class DocumentTypeModule {}
