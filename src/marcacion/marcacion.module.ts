import { Module } from '@nestjs/common';
import { MarcacionController } from './marcacion.controller';
import { MarcacionService } from './marcacion.service';
import { AuthModule } from '../auth/auth.module'; 
import { PrismaService } from '../prisma/prisma.service'; 
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [AuthModule, PrismaModule], 
  controllers: [MarcacionController],
  providers: [MarcacionService,PrismaService]
})
export class MarcacionModule {}
