import { Test, TestingModule } from '@nestjs/testing';
import { MarcacionService } from './marcacion.service';

describe('MarcacionService', () => {
  let service: MarcacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarcacionService],
    }).compile();

    service = module.get<MarcacionService>(MarcacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
