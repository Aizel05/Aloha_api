import { Test, TestingModule } from '@nestjs/testing';
import { TurnoTiempoController } from './turno_tiempo.controller';

describe('TurnoTiempoController', () => {
  let controller: TurnoTiempoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnoTiempoController],
    }).compile();

    controller = module.get<TurnoTiempoController>(TurnoTiempoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
