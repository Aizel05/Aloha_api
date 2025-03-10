import { Test, TestingModule } from '@nestjs/testing';
import { TurnoTiempoService } from './turno_tiempo.service';

describe('TurnoTiempoService', () => {
  let service: TurnoTiempoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoTiempoService],
    }).compile();

    service = module.get<TurnoTiempoService>(TurnoTiempoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
