import { Module } from '@nestjs/common';

import { ConfigService } from '@services';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        __dirname + `/environments/${process.env.NODE_ENV.trim()}.env`,
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
