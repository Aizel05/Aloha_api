import { Test, TestingModule } from '@nestjs/testing';
import { RegistroTiempoService } from './registro_tiempo.service';

describe('RegistroTiempoService', () => {
  let service: RegistroTiempoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroTiempoService],
    }).compile();

    service = module.get<RegistroTiempoService>(RegistroTiempoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
