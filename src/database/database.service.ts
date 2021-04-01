 
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConnectionOptions } from 'node:tls';
import { ConfigService } from 'src/config.service';
import {ConfigModule} from '../config/config.module';
import {configuration} from '../config/config.keys';

//configurar arreglo el cual tare datos de la bd
export const databaseProviders =[
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService){

            return{
                ssl: true,
                type: 'postgres' as 'postgres',
                host: config.get(configuration.HOST),
                port: parseInt(config.get(configuration.PORT_DB)),
                username: config.get(configuration.USERNAME),
                pass: config.get(configuration.PASSWORD),
                entities: [__dirname + '/../**/.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            } as  ConnectionOptions;
        }
    })

];