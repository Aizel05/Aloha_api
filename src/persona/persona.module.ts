import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { AuthModule } from '../auth/auth.module'; 
import { PrismaService } from '../prisma/prisma.service'; 
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule], 
  controllers: [PersonaController],
  providers: [PersonaService, PrismaService],
})
export class PersonaModule {}
