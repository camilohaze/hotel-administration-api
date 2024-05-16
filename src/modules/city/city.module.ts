import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityService } from '@services';
import { CityEntity } from '@entities';
import { ConfigModule } from '@modules';

import { CityController } from './controllers/city.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), ConfigModule],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
