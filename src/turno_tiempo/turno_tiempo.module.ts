import { Module } from '@nestjs/common';
import { TurnoTiempoController } from './turno_tiempo.controller';
import { TurnoTiempoService } from './turno_tiempo.service';

@Module({
  controllers: [TurnoTiempoController],
  providers: [TurnoTiempoService]
})
export class TurnoTiempoModule {}
