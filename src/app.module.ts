import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PersonaModule } from './persona/persona.module';
import { TurnoTiempoModule } from './turno_tiempo/turno_tiempo.module';
import { MarcacionModule } from './marcacion/marcacion.module';
import { ImagenModule } from './imagen/imagen.module';
import { JornadaModule } from './jornada/jornada.module';
import { RegistroTiempoModule } from './registro_tiempo/registro_tiempo.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './tokens/refresh-token.entity';
import { AccessToken } from './tokens/access-token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'mysql' | 'mssql'>('DB_TYPE', 'mysql') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [RefreshToken, AccessToken],
        synchronize: true,
      }),
      inject: [ConfigService],
    }), AuthModule, PersonaModule, TurnoTiempoModule, MarcacionModule, ImagenModule, JornadaModule, RegistroTiempoModule],
  controllers: [AppController],
  providers: [
     AppService,
	  {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}



