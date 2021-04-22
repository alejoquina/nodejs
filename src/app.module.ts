import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config.service';
import { configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

import { RoleModule } from './modules/role/role.module';




@Module({
  
  controllers: [AppController],
  providers: [AppService],
  imports: [RoleModule],
  
  
})
export class AppModule {

    static port: number | string;

    constructor(private readonly _configService: ConfigService){
      AppModule.port = this._configService.get(configuration.PORT);
    }

}
