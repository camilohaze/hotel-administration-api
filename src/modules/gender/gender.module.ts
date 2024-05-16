import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenderService } from '@services';
import { GenderEntity } from '@entities';
import { ConfigModule } from '@modules';

import { GenderController } from './controllers/gender.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GenderEntity]), ConfigModule],
  providers: [GenderService],
  controllers: [GenderController],
})
export class GenderModule {}
