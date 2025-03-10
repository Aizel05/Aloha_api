import {  MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ImagenController } from './imagen.controller';
import { ImagenService } from './imagen.service';
import { AuthModule } from '../auth/auth.module'; 
import { PrismaService } from '../prisma/prisma.service'; 
import { PrismaModule } from '../prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [AuthModule, PrismaModule,
   MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
    }),
  ],
  controllers: [ImagenController],
  providers: [ImagenService, PrismaService]
})
export class ImagenModule {}
