import { Test, TestingModule } from '@nestjs/testing';
import { MarcacionController } from './marcacion.controller';

describe('MarcacionController', () => {
  let controller: MarcacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcacionController],
    }).compile();

    controller = module.get<MarcacionController>(MarcacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
