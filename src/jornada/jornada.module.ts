import { Module } from '@nestjs/common';
import { JornadaController } from './jornada.controller';
import { JornadaService } from './jornada.service';

@Module({
  controllers: [JornadaController],
  providers: [JornadaService]
})
export class JornadaModule {}
