import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '@services';
import { AuthEntity } from '@entities';
import { ConfigModule } from '@modules';

import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
