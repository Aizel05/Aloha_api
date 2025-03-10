import { Module } from '@nestjs/common';
import { RegistroTiempoController } from './registro_tiempo.controller';
import { RegistroTiempoService } from './registro_tiempo.service';

@Module({
  controllers: [RegistroTiempoController],
  providers: [RegistroTiempoService]
})
export class RegistroTiempoModule {}
