import { Test, TestingModule } from '@nestjs/testing';
import { RegistroTiempoController } from './registro_tiempo.controller';

describe('RegistroTiempoController', () => {
  let controller: RegistroTiempoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroTiempoController],
    }).compile();

    controller = module.get<RegistroTiempoController>(RegistroTiempoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
