import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⚡ Configuración de Swagger con autenticación por Bearer Token
  const config = new DocumentBuilder()
    .setTitle('Api Aloha')
    .setDescription('Esta API proporciona funcionalidades para obtener marcaciones, personas registradas e imagenes de rostros de estas personas.\n\n## Como Funciona\n1. Obtiene un token de autenticación.\n2. Incluye el token en el encabezado de cada petición usando el formato: `Bearer <token>`.\n3. Comienza a usar los endpoints disponibles.')
    .setVersion('1.0')
    .addBearerAuth(  {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Ingrese el token ',
    }
  ) 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ALOHA', app, document);

  await app.listen(3000);
  

}

bootstrap();
